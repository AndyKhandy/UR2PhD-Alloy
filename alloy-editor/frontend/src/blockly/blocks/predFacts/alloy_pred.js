import * as Blockly from "blockly";

Blockly.Blocks["alloy_pred"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("pred ")
      .appendField(new Blockly.FieldTextInput("name"), "NAME")
      .appendField(" {");

    this.appendStatementInput("BODY").setCheck("LogicalStatement");

    this.appendDummyInput().appendField("}");

    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setColour("B38E4F");
    this.setTooltip(
      "Defines a predicate — a named, reusable constraint you can later run or " +
        "call by name. Stack constraint lines inside the braces. " +
        "Example: pred hasParent { some Person.parent }",
    );
  },
};
