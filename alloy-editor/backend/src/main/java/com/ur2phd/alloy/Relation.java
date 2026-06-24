package com.ur2phd.alloy;

public class Relation {
    private final String fieldName;
    private final String source;
    private final String target;

    public Relation(String fieldName, String source, String target) {
        this.fieldName = fieldName;
        this.source = source;
        this.target = target;
    }

    public String getFieldName() { return fieldName; }
    public String getSource()    { return source; }
    public String getTarget()    { return target; }

    @Override
    public String toString() {
        return fieldName + ": " + source + " -> " + target;
    }
}
