import { alloyGenerator } from "../alloy_generator";

alloyGenerator.forBlock["alloy_sigIn_empty"] = function(block) {
    const name = block.getFieldValue("NAME");
    const subsetOf = block.getFieldValue("INNAME")

    return `sig ${name} in ${subsetOf} {}`;
};