import * as Blockly from "blockly";

Blockly.Blocks["alloy_or"] = {
  init: function () {
    this.appendValueInput("A").setCheck("Boolean");

    this.appendDummyInput().appendField("or");

    this.appendValueInput("B").setCheck("Boolean");

    this.setOutput(true, "Boolean");
    this.setInputsInline(true);
    this.setColour(160);
  },
};
