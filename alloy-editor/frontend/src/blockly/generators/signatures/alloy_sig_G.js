import { alloyGenerator } from "../alloy_generator";

alloyGenerator.forBlock["alloy_sig"] = function(block) {
    const name = block.getFieldValue("NAME");

    const body = alloyGenerator.statementToCode(block, "BODY");

    return `sig ${name} {
    ${body}
}`;
};