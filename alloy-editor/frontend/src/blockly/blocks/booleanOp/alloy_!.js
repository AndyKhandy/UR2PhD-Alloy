import * as Blockly from "blockly";

Blockly.Blocks["alloy_!"] = {
  init: function () {
    this.appendDummyInput().appendField("!");
    this.appendValueInput("A").setCheck("Boolean");

    this.setOutput(true, "Boolean");
    this.setInputsInline(true);
    this.setColour(160);
    this.setTooltip(
      "Logical NOT — flips a formula's truth value. The socket accepts a " +
        "true/false formula (Boolean). Example: !(a in b)",
    );
  },
};
