import { alloyGenerator } from "../alloy_generator";

alloyGenerator.forBlock["alloy_sig_empty"] = function(block) {
    const name = block.getFieldValue("NAME");

    return `sig ${name} {}\n`
}