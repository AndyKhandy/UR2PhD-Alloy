import { alloyGenerator } from "../alloy_generator";

alloyGenerator.forBlock["alloy_sigIn"] = function(block) {
    const name = block.getFieldValue("NAME");
    const subsetOf = block.getFieldValue("INNAME")

    const body = alloyGenerator.statementToCode(block, "BODY");

    return `sig ${name} in ${subsetOf} {
    ${body}
}`;
};