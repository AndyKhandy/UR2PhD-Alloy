import * as Blockly from "blockly";

Blockly.Blocks["alloy_+"] = {
  init: function () {
    this.appendValueInput("LEFT").setCheck("Expression");

    this.appendDummyInput().appendField("+");

    this.appendValueInput("RIGHT").setCheck("Expression");

    this.setOutput(true, "Expression");
    this.setInputsInline(true);
    this.setColour("#197cba");
    this.setTooltip(
      "Set union (+) — produces the set of atoms that appear in either side. " +
        "Both sockets take a set/expression (Expression). Example: Teacher + Student",
    );
  },
};
