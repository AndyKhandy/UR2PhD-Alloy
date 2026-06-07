import * as Blockly from "blockly";

Blockly.Blocks["alloy_sigEx"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("sig")
      .appendField(new Blockly.FieldTextInput("Student"), "NAME")
      .appendField("extends")
      .appendField(new Blockly.FieldTextInput("Person"), "EXTENDNAME")
      .appendField("{");

    this.appendStatementInput("BODY");

    this.appendDummyInput().appendField("}");

    this.setPreviousStatement(true);
    this.setNextStatement(true);

    this.setColour(230);
  },
};
