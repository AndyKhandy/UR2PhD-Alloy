import * as Blockly from "blockly";

Blockly.Blocks["alloy_run"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("run")
      .appendField(new Blockly.FieldTextInput("predName"), "TARGET")
      .appendField("for")
      .appendField(new Blockly.FieldNumber(5,1), "AMOUNT");

    this.setPreviousStatement(true);
    this.setColour(120);
  },
};
