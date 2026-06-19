import * as Blockly from "blockly";

Blockly.Blocks["alloy_~"] = {
  init: function () {
    this.appendDummyInput().appendField("~");
    this.appendValueInput("A").setCheck("Expression");

    this.setOutput(true, "Expression");
    this.setInputsInline(true);
    this.setColour("#47008C");
    this.setTooltip(
      "Transpose (~) — flips a binary relation's direction, swapping its two " +
        "columns. The socket takes a binary relation/expression (Expression). " +
        "Example: ~parent",
    );
  },
};
