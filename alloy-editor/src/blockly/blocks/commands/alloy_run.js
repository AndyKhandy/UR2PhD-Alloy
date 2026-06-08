import * as Blockly from "blockly";

Blockly.Blocks["alloy_run"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("run")
      .appendField(new Blockly.FieldTextInput("predName"), "TARGET")
      .appendField("for")
      .appendField(new Blockly.FieldNumber(5,1), "AMOUNT");

    this.setPreviousStatement(true);
    this.setColour(120);
    this.setTooltip(
      "run — asks the Analyzer to find an example instance that satisfies the " +
        "named predicate, searching up to the given scope (max atoms per " +
        "signature). Example: run predName for 5",
    );
  },
};
