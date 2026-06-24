import { alloyGenerator } from "../alloy_generator";

alloyGenerator.forBlock["alloy_check"] = function (block) {
  const assertName = block.getFieldValue("TARGET");

  const amount = block.getFieldValue("AMOUNT");

  return `check ${assertName} for ${amount}`;
};
