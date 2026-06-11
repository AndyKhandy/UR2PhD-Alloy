import { alloyGenerator } from "../alloy_generator";

alloyGenerator.forBlock["alloy_rule_line"] = function (block) {
    const rule = alloyGenerator.valueToCode(block, "RULE", 0) || "none"

    return `${rule}`;
};
