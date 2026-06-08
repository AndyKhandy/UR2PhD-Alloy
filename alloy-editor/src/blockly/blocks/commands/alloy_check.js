import * as Blockly from "blockly";

Blockly.Blocks["alloy_check"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("check")
      .appendField(new Blockly.FieldTextInput("assertName"), "TARGET")
      .appendField("for")
      .appendField(new Blockly.FieldNumber(5,1), "AMOUNT");

    this.setPreviousStatement(true);
    this.setColour(120);
    this.setTooltip(
      "check — asks the Analyzer to find a counterexample that violates the " +
        "named assertion, up to the given scope. If none is found, the " +
        "assertion holds within that scope. Example: check assertName for 5",
    );
  },
};
