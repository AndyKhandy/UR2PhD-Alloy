import * as Blockly from "blockly";

Blockly.Blocks["alloy_relation"] = {
  init: function () {
    this.setPreviousStatement(true, "Relation");
    this.setNextStatement(true, "Relation");
    this.setColour(120);

    this.appendDummyInput()
      .appendField("field")
      .appendField(new Blockly.FieldTextInput("relationName"), "NAME")
      .appendField(":")
      .appendField(
        new Blockly.FieldDropdown([
          ["no", "no"],
          ["one", "one"],
          ["lone", "lone"],
          ["some", "some"],
          ["set", "set"],
        ]),
        "MULTIPLICITY",
      )
      .appendField(new Blockly.FieldTextInput("targetSig"), "TARGET_SET");

    this.setInputsInline(true);

    this.setTooltip(
      "Declares a field inside a signature: a relation from this signature to " +
        "a target set, with a multiplicity (no/one/lone/some/set). " +
        "Example: field: one targetSig",
    );
  },
};
