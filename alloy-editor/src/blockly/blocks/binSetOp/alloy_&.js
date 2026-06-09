import * as Blockly from "blockly";

Blockly.Blocks["alloy_&"] = {
  init: function () {
    this.appendValueInput("A").setCheck("Expression");

    this.appendDummyInput().appendField("&");

    this.appendValueInput("B").setCheck("Expression");

    this.setOutput(true, "Expression");
    this.setInputsInline(true);
    this.setColour("#00058C");
    this.setTooltip(
      "Set intersection (&) — produces atoms that appear in both sides. " +
        "Both sockets take a set/expression (Expression). Example: Teacher & Parent",
    );
  },
};
