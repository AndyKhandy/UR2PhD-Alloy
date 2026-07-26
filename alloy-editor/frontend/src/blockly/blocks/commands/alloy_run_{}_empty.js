import * as Blockly from "blockly";

Blockly.Blocks["alloy_run_{}_empty"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("run {")
      .appendField("} for")
      .appendField(new Blockly.FieldNumber(5,1), "AMOUNT");


    this.setColour("3BA61B");
    this.setTooltip(
      "run {} — asks the Analyzer to find an example instance that satisfies the " +
        "constraints (can leave empty) and scope (max atoms per " +
        "signature). Example: run {} for 5",
    );
  },
};
