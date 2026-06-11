import * as Blockly from "blockly";

Blockly.Blocks["alloy_sig_empty"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("sig")
      .appendField(new Blockly.FieldTextInput("Person"), "NAME")
      .appendField("{ }");

    this.setPreviousStatement(true);
    this.setNextStatement(true);

    this.setColour(230);
    this.setTooltip(
      "Declares a signature — a named set of atoms (like a type/class). " +
        "Field blocks nest inside the braces. Example: sig Person { }",
    );
  },
};
