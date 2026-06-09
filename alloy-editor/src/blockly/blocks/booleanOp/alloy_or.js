import * as Blockly from "blockly";

Blockly.Blocks["alloy_or"] = {
  init: function () {
    this.appendValueInput("A").setCheck("Boolean");

    this.appendDummyInput().appendField("or");

    this.appendValueInput("B").setCheck("Boolean");

    this.setOutput(true, "Boolean");
    this.setInputsInline(true);
    this.setColour("8C0000");
    this.setTooltip(
      "Logical OR — true when at least one side is true. Each socket accepts " +
        "a true/false formula (Boolean). Example: (a in b) or (c = d)",
    );
  },
};
