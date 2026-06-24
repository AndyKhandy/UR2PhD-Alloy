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
        CompModule world = CompUtil.parseEverything_fromString(reporter, modelText);
        Command command  = world.getAllCommands().get(commandIndex);

        A4Options options = new A4Options();
        options.solver    = PMaxSAT4JRef.INSTANCE;

        A4Solution instance = TranslateAlloyToKodkod.execute_command(
            reporter, world.getAllReachableSigs(), command, options);

        if (!instance.satisfiable()) {
            return new AlloyResult(false, new LinkedHashMap<>(), new ArrayList<>());
        }

        Map<String, List<String>> atoms    = new LinkedHashMap<>();
        List<Relation>            relations = new ArrayList<>();

        for (Sig sig : world.getAllReachableSigs()) {
            if (sig == Sig.UNIV || sig == Sig.SIGINT ||
                sig == Sig.SEQIDX || sig == Sig.STRING || sig == Sig.NONE) {
                continue;
            }

            List<String> sigAtoms = new ArrayList<>();
            for (A4Tuple tuple : instance.eval(sig)) {
                sigAtoms.add(tuple.atom(0));
            }
            atoms.put(sig.label, sigAtoms);

            for (Sig.Field field : sig.getFields()) {
                for (A4Tuple tuple : instance.eval(field)) {
                    relations.add(new Relation(field.label, tuple.atom(0), tuple.atom(1)));
                }
            }
        }

        return new AlloyResult(true, atoms, relations);
    }
}
