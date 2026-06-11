import { alloyGenerator } from "../alloy_generator";

alloyGenerator.forBlock["alloy_fact"] = function(block) {
    const name = block.getFieldValue("NAME");

    const body = alloyGenerator.statementToCode(block, "BODY");

    return `fact ${name} {
    ${body}
}`;
};

