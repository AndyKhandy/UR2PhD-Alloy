import { alloyGenerator } from "../alloy_generator";

alloyGenerator.forBlock["alloy_set"] = function (block) {
    const multiplicity = block.getFieldValue("MULTIPLICITY")
    const a = alloyGenerator.valueToCode(block, "A", 0) || "none";

    return [`${multiplicity} ${a}`, 0];
};
