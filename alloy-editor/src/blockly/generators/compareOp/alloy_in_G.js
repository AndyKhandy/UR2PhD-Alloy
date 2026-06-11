import { alloyGenerator } from "../alloy_generator";

alloyGenerator.forBlock["alloy_in"] = function (block) {
    const a = alloyGenerator.valueToCode(block, "LEFT", 0) || "none";
    const b = alloyGenerator.valueToCode(block, "RIGHT", 0) || "none";

    return [`${a} in ${b}`, 0];
};
