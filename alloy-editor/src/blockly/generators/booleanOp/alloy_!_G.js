import { alloyGenerator } from "../alloy_generator";

alloyGenerator.forBlock["alloy_!"] = function (block) {
    const a = alloyGenerator.valueToCode(block, "A", 0) || "none";

    return [`! ${a}`, 0];
};
