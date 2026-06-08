import * as Blockly from "blockly";

Blockly.Blocks["alloy_-"] = {
  init: function () {
    this.appendValueInput("A").setCheck("Expression");

    this.appendDummyInput().appendField("-");

    this.appendValueInput("B").setCheck("Expression");

    this.setOutput(true, "Expression");
    this.setInputsInline(true);
    this.setColour(160);
    this.setTooltip(
      "Set difference (-) — produces atoms in the left set that are NOT in the " +
        "right set. Both sockets take a set/expression (Expression). " +
        "Example: Person - Teacher",
    );
  },
};
