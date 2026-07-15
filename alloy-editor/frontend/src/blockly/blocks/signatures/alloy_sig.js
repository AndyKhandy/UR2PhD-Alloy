import * as Blockly from "blockly";

Blockly.Blocks["alloy_sig"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("sig")
      .appendField(new Blockly.FieldTextInput("Person"), "NAME")
      .appendField("{");

    this.appendStatementInput("BODY").setCheck("Relation");

    this.appendDummyInput().appendField("}");


    this.setColour(230);
    this.setTooltip(
      "Declares a signature — a named set of atoms (like a type/class). " +
        "Field blocks nest inside the braces. Example: sig Person { }",
    );
  },
};
