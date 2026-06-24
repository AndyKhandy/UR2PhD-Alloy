import { alloyGenerator } from "../alloy_generator";

alloyGenerator.forBlock["alloy_run_{}"] = function(block) {
    const constraint = block.getFieldValue("TARGET");

    const amount = block.getFieldValue("AMOUNT");

    return `run {${constraint}} for ${amount}`;
};