import { alloyGenerator } from "../alloy_generator";

alloyGenerator.forBlock["alloy_pred"] = function(block) {
    const name = block.getFieldValue("NAME");

    const body = alloyGenerator.statementToCode(block, "BODY");

    return `pred ${name} {
    ${body}
}`;
};
