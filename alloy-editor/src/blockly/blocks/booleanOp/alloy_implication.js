import * as Blockly from "blockly";

Blockly.Blocks["alloy_implication"] = {
  init: function () {
    this.appendValueInput("LEFT").setCheck("Boolean");

    this.appendDummyInput().appendField("=>");

    this.appendValueInput("RIGHT").setCheck("Boolean");

    this.setOutput(true, "Boolean");
    this.setInputsInline(true);
    this.setColour("8C0000");
    this.setTooltip(
      "Implication (=>) — true unless the left side is true and the right is " +
        "false. Each socket accepts a true/false formula (Boolean). " +
        "Example: (x in A) => (x in B)",
    );
  },
};
