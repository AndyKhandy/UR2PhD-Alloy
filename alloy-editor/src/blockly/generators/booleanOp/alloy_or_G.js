import { alloyGenerator } from "../alloy_generator";

alloyGenerator.forBlock["alloy_or"] = function (block) {
    const a = alloyGenerator.valueToCode(block, "LEFT", 0) || "none";
    const b = alloyGenerator.valueToCode(block, "RIGHT", 0) || "none";

    return [`${a} or ${b}`, 0];
};
