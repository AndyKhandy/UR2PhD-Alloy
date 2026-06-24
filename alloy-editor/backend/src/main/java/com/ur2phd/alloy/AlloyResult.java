package com.ur2phd.alloy;

import java.util.List;
import java.util.Map;

public class AlloyResult {
    private final boolean satisfiable;
    private final Map<String, List<String>> atoms;
    private final List<Relation> relations;

    public AlloyResult(boolean satisfiable,
                       Map<String, List<String>> atoms,
                       List<Relation> relations) {
        this.satisfiable = satisfiable;
        this.atoms = atoms;
        this.relations = relations;
    }

    public boolean isSatisfiable()              { return satisfiable; }
    public Map<String, List<String>> getAtoms() { return atoms; }
    public List<Relation> getRelations()        { return relations; }

    @Override
    public String toString() {
        if (!satisfiable) {
            return "Status: UNSATISFIABLE";
        }
        StringBuilder sb = new StringBuilder("Status: SATISFIABLE\n");
        for (Map.Entry<String, List<String>> entry : atoms.entrySet()) {
            sb.append("Signature: ").append(entry.getKey()).append("\n");
            for (String atom : entry.getValue()) {
                sb.append("  Atom: ").append(atom).append("\n");
            }
        }
        if (!relations.isEmpty()) {
            sb.append("Relations:\n");
            for (Relation r : relations) {
                sb.append("  ").append(r).append("\n");
            }
        }
        return sb.toString().trim();
    }
}
