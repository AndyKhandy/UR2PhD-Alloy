import * as Blockly from "blockly";

Blockly.Blocks["alloy_run"] = {
  init: function () {
    this.appendDummyInput().appendField("run");

    this.setPreviousStatement(true);
    this.setColour(120);
  },
};
