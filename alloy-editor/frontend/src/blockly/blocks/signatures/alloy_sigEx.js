import * as Blockly from "blockly";
import {
  SIGNATURE_BLOCK_TYPES,
  createUniqueNameValidator,
  signatureDropdownOptions,
} from "../../workspaceNames";

Blockly.Blocks["alloy_sigEx"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("sig")
      .appendField(
        new Blockly.FieldTextInput(
          "Student",
          createUniqueNameValidator(SIGNATURE_BLOCK_TYPES),
        ),
        "NAME",
      )
      .appendField("extends")
      .appendField(new Blockly.FieldDropdown(signatureDropdownOptions), "EXTENDNAME")
      .appendField("{");

    this.appendStatementInput("BODY").setCheck("Relation");

    this.appendDummyInput().appendField("}");


    this.setColour(230);
    this.setTooltip(
      "Declares a signature that extends a parent — it inherits the parent's " +
        "fields and is a subset of it. Field blocks nest inside the braces. " +
        "Example: sig Student extends Person { }",
    );
  },
};
