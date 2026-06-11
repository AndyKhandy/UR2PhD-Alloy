import * as Blockly from "blockly";

Blockly.Blocks["alloy_biconditional"] = {
  init: function () {
    this.appendValueInput("LEFT").setCheck("Boolean");

    this.appendDummyInput().appendField("<=>");

    this.appendValueInput("RIGHT").setCheck("Boolean");

    this.setOutput(true, "Boolean");
    this.setInputsInline(true);
    this.setColour("8C0000");
    this.setTooltip(
      "Biconditional (<=>) — true when both sides have the same truth value " +
        "(both true or both false). Each socket accepts a true/false formula " +
        "(Boolean). Example: (x in A) <=> (x in B)",
    );
  },
};
