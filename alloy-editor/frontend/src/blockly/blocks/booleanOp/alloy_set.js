import * as Blockly from "blockly";

Blockly.Blocks["alloy_set"] = {
  init: function () {
    this.setColour(160);

    this.appendDummyInput().appendField(
      new Blockly.FieldDropdown([
        ["no","no"],
        ["one", "one"],
        ["lone", "lone"],
        ["some", "some"],
        ["set", "set"],
      ]),
      "MULTIPLICITY",
    );

    this.appendValueInput("A").setCheck("Expression");

    this.setOutput(true, "Boolean");

    this.setInputsInline(true);
    this.setTooltip(
      "Multiplicity test — checks how many atoms an expression denotes " +
        "(no = none, one = exactly one, lone = at most one, some = at least one, " +
        "set = any number). The socket accepts a set/expression (Expression). " +
        "Example: some Person.parent",
    );
  },
};
