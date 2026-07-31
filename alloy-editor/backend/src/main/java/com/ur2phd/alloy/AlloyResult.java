package com.ur2phd.alloy;

import java.util.List;

public class AlloyResult {
    private final boolean satisfiable;
    private final List<AlloyInstanceResult> instances;
    private final int instanceCount;
    private final boolean limitReached;

    public AlloyResult(boolean satisfiable,
                       List<AlloyInstanceResult> instances,
                       int instanceCount,
                       boolean limitReached) {
        this.satisfiable = satisfiable;
        this.instances = instances;
        this.instanceCount = instanceCount;
        this.limitReached = limitReached;
    }

    public boolean isSatisfiable() { return satisfiable; }
    public List<AlloyInstanceResult> getInstances() { return instances; }
    public int getInstanceCount() { return instanceCount; }
    public boolean isLimitReached() { return limitReached; }
}
