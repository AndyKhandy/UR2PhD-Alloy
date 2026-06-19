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

public class AlloyAPI {

	public static void main (String [] args) {

		//What we will want: String representation of whatever is captured on the blocks
		String model_text = " sig Person {} run { some Person } for 3 ";

		 //Alloy requires this reporter object - it essentially handles thrown errors when trying to run a model/command
		 A4Reporter rep = new A4Reporter() {
            @Override
            public void warning(ErrorWarning msg) {
                System.out.println(msg.toString().trim());
                System.out.flush();
            }
	    };

	    //This reads in the Alloy model, parses it and then stores it as a CompModule
	    //Which basically is an object interpretation of the model that we can work with to do things like iterate over commands in the model and run them
        CompModule world = CompUtil.parseEverything_fromString(rep, model_text);

        //Case in point, we can get the list of all commands written in the model. This runs the first command
        //We would want this number to align with the user's selection
        int cmdNum = 0;
        Command command = world.getAllCommands().get(cmdNum);

        //These options configure "how" to run a command - what solver to use, what is the max memory the execution can use, etc
        //We usually just set it up in a very bare bones format - i.e. just set the SAT solver then use the default for everything else
        A4Options options = new A4Options();
        options.solver = PMaxSAT4JRef.INSTANCE;

		//Runs first command, stores the result
        A4Solution instance = TranslateAlloyToKodkod.execute_command(rep, world.getAllReachableSigs(), command, options);

		// Check if a satisfying instance actually exists
if (instance.satisfiable()) {
    System.out.println("Status: SATISFIABLE");

    // 1. Iterate over all signatures parsed in the environment
    for (Sig sig : world.getAllReachableSigs()) {
        
        // FIX: Explicitly skip built-in primitive system types
        if (sig == Sig.UNIV || sig == Sig.SIGINT || sig == Sig.SEQIDX || sig == Sig.STRING || sig == Sig.NONE) {
            continue;
        }

        // Alternatively, you can ensure it's a user-defined signature by checking its label:
        // if (!sig.label.startsWith("this/")) continue;

        System.out.println("Signature Name: " + sig.label);

        // 2. Extract the actual elements (atoms) assigned to this signature
        for (A4Tuple tuple : instance.eval(sig)) {
            System.out.println("  Found Atom: " + tuple.atom(0));
        }
		
        // 3. Extract the relations (fields) defined inside this signature
for (Sig.Field field : sig.getFields()) {
    // field.label gives you the name of the relation (e.g., "mapsTo", "friends")
    System.out.println("  Field/Relation: " + field.label);
    
    // Evaluate the exact relational links/tuples for this specific field
    for (A4Tuple tuple : instance.eval(field)) {
        // A relation tuple links atoms together (e.g., Person$0 -> File$1)
        System.out.println("    Link: " + tuple.atom(0) + " maps to " + tuple.atom(1));
    }
}
    }
} else {
    System.out.println("Status: UNSATISFIABLE");
}

	}
}
