
import { alloyGenerator } from "../alloy_generator";

alloyGenerator.forBlock["alloy_relation"] = function(block) {
    const name = block.getFieldValue("NAME");
    const multiplicity = block.getFieldValue("MULTIPLICITY");
    const target = block.getFieldValue("TARGET_SET")

    return `${name}: ${multiplicity} ${target}`
}