import { alloyGenerator } from "../alloy_generator";

alloyGenerator.forBlock["alloy_run"] = function(block) {
    const predName = block.getFieldValue("TARGET");

    const amount = alloyGenerator.statementToCode(block, "AMOUNT");

    return `run ${predName} for ${amount}`;
};