package com.ur2phd.alloy;

import edu.mit.csail.sdg.alloy4.A4Reporter;
import edu.mit.csail.sdg.alloy4.ErrorWarning;
import edu.mit.csail.sdg.ast.Command;
import edu.mit.csail.sdg.ast.Sig;
import edu.mit.csail.sdg.parser.CompModule;
import edu.mit.csail.sdg.parser.CompUtil;
import edu.mit.csail.sdg.translator.A4Options;
import edu.mit.csail.sdg.translator.A4Solution;
import edu.mit.csail.sdg.translator.A4Tuple;
import edu.mit.csail.sdg.translator.TranslateAlloyToKodkod;
import kodkod.solvers.PMaxSAT4JRef;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class AlloyRunner {

    private static final int MAXIMUM_INSTANCES = 10;

    private final A4Reporter reporter;

    public AlloyRunner() {
        this.reporter = new A4Reporter() {
            @Override
            public void warning(ErrorWarning msg) {
                System.out.println(msg.toString().trim());
                System.out.flush();
            }
        };
    }

    public AlloyResult runModel(String modelText) {
        return runModel(modelText, 0);
    }

    public AlloyResult runModel(String modelText, int commandIndex) {
        if (modelText == null || modelText.isBlank()) {
            throw new IllegalArgumentException("modelText must not be blank");
        }

        CompModule world = CompUtil.parseEverything_fromString(reporter, modelText);
        List<Command> commands = world.getAllCommands();
        if (commands.isEmpty()) {
            throw new IllegalArgumentException("The Alloy model does not contain a command");
        }
        if (commandIndex < 0 || commandIndex >= commands.size()) {
            throw new IllegalArgumentException("The requested Alloy command does not exist");
        }

        A4Options options = new A4Options();
        options.solver = PMaxSAT4JRef.INSTANCE;

        A4Solution solution = TranslateAlloyToKodkod.execute_command(
                reporter, world.getAllReachableSigs(), commands.get(commandIndex), options);

        if (!solution.satisfiable()) {
            return new AlloyResult(false, new ArrayList<>(), 0, false);
        }

        List<AlloyInstanceResult> instances = new ArrayList<>();
        while (solution.satisfiable() && instances.size() < MAXIMUM_INSTANCES) {
            instances.add(extractInstance(solution, world, instances.size()));
            solution = solution.next();
        }

        boolean limitReached = instances.size() == MAXIMUM_INSTANCES && solution.satisfiable();
        return new AlloyResult(true, instances, instances.size(), limitReached);
    }

    private AlloyInstanceResult extractInstance(A4Solution solution,
                                                 CompModule world,
                                                 int index) {
        Map<String, List<String>> atoms = new LinkedHashMap<>();
        List<Relation> relations = new ArrayList<>();

        for (Sig sig : world.getAllReachableSigs()) {
            if (sig == Sig.UNIV || sig == Sig.SIGINT ||
                    sig == Sig.SEQIDX || sig == Sig.STRING || sig == Sig.NONE) {
                continue;
            }

            List<String> sigAtoms = new ArrayList<>();
            for (A4Tuple tuple : solution.eval(sig)) {
                sigAtoms.add(tuple.atom(0));
            }
            atoms.put(sig.label, sigAtoms);

            for (Sig.Field field : sig.getFields()) {
                // Existing API behavior supports binary relations only.
                // Higher-arity fields are not given an incompatible JSON shape.
                for (A4Tuple tuple : solution.eval(field)) {
                    if (tuple.arity() == 2) {
                        relations.add(new Relation(field.label, tuple.atom(0), tuple.atom(1)));
                    }
                }
            }
        }

        return new AlloyInstanceResult(index, atoms, relations);
    }
}
