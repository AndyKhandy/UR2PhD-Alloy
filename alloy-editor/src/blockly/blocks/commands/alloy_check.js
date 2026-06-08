import * as Blockly from "blockly";

Blockly.Blocks["alloy_check"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("check")
      .appendField(new Blockly.FieldTextInput("assertName"), "TARGET")
      .appendField("for")
      .appendField(new Blockly.FieldNumber(5,1), "AMOUNT");

    this.setPreviousStatement(true);
    this.setColour(120);
  },
};
