import * as Blockly from "blockly";

Blockly.Blocks["alloy_and"] = {
  init: function () {
    this.appendValueInput("A").setCheck("Boolean");

    this.appendDummyInput().appendField("and");

    this.appendValueInput("B").setCheck("Boolean");

    this.setOutput(true, "Boolean");
    this.setInputsInline(true);
    this.setColour(160);
  },
};
