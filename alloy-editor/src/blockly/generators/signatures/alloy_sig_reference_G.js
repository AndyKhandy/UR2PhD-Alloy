
import { alloyGenerator } from "../alloy_generator";

alloyGenerator.forBlock["alloy_sig_reference"] = function(block) {
    const name = block.getFieldValue("SIG_NAME");

    return `${name}`
};