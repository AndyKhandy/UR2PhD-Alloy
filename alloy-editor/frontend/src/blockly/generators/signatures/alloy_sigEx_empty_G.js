import { alloyGenerator } from "../alloy_generator";

alloyGenerator.forBlock["alloy_sigEx_empty"] = function(block) {
    const name = block.getFieldValue("NAME");
    const extendedFrom = block.getFieldValue("EXTENDNAME")

    return `sig ${name} extends ${extendedFrom} {}\n`;
};