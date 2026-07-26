import { alloyGenerator } from "../alloy_generator";

alloyGenerator.forBlock["alloy_run_{}_empty"] = function (block) {
  const amount = block.getFieldValue("AMOUNT");

  return `run {} for ${amount}`;
};
