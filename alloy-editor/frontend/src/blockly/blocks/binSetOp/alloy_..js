import * as Blockly from "blockly";

Blockly.Blocks["alloy_."] = {
  init: function () {
    this.appendValueInput("LEFT").setCheck("Expression");

    this.appendDummyInput().appendField(".");

    this.appendValueInput("RIGHT").setCheck("Expression");

    this.setOutput(true, "Expression");
    this.setInputsInline(true);
    this.setColour("#197cba");
    this.setTooltip(
      "Relational join (.) — navigates/composes relations, e.g. follows a field " +
        "from a set to its targets. Both sockets take a set/expression " +
        "(Expression). Example: Person.parent",
    );
  },
};
