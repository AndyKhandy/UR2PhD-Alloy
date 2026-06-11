import { alloyGenerator } from "../alloy_generator";

alloyGenerator.forBlock["alloy_sigEx"] = function(block) {
    const name = block.getFieldValue("NAME");
    const extendedFrom = block.getFieldValue("EXTENDNAME")

    const body = alloyGenerator.statementToCode(block, "BODY");

    return `sig ${name} extends ${extendedFrom} {
    ${body}
}`;
};