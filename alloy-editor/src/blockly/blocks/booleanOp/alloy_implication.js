import * as Blockly from "blockly";

Blockly.Blocks["alloy_implication"] = {
  init: function () {
    this.appendValueInput("A").setCheck("Boolean");

    this.appendDummyInput().appendField("=>");

    this.appendValueInput("B").setCheck("Boolean");

    this.setOutput(true, "Boolean");
    this.setInputsInline(true);
    this.setColour(160);
  },
};
