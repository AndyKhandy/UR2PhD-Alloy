import { alloyGenerator } from "../alloy_generator";

alloyGenerator.forBlock["alloy_run"] = function (block) {
  const predName = block.getFieldValue("TARGET");

  const amount = block.getFieldValue("AMOUNT");

  return `run ${predName} for ${amount}`;
};
