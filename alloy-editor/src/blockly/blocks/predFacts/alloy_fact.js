import * as Blockly from "blockly";

Blockly.Blocks["alloy_fact"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("fact ")
      .appendField(new Blockly.FieldTextInput("name"), "NAME")
      .appendField(" {");

    this.appendStatementInput("BODY").setCheck("LogicalStatement");

    this.appendDummyInput().appendField("}");

    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(20);
  },
};
