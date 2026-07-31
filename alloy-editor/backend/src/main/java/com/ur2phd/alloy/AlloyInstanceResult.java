package com.ur2phd.alloy;

import java.util.List;
import java.util.Map;

public class AlloyInstanceResult {
    private final int index;
    private final Map<String, List<String>> atoms;
    private final List<Relation> relations;

    public AlloyInstanceResult(int index,
                               Map<String, List<String>> atoms,
                               List<Relation> relations) {
        this.index = index;
        this.atoms = atoms;
        this.relations = relations;
    }

    public int getIndex() { return index; }
    public Map<String, List<String>> getAtoms() { return atoms; }
    public List<Relation> getRelations() { return relations; }
}
