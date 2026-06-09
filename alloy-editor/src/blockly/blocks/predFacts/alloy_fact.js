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
    this.setColour("B38E4F");
    this.setTooltip(
      "Defines a fact — a constraint that must ALWAYS hold in every instance " +
        "of the model. Stack constraint lines inside the braces. " +
        "Example: fact { all p: Person | p not in p.parent }",
    );
  },
};
