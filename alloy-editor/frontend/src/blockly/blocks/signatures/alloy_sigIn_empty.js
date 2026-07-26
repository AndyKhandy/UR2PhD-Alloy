import * as Blockly from "blockly";
import {
  SIGNATURE_BLOCK_TYPES,
  createUniqueNameValidator,
  signatureDropdownOptions,
} from "../../workspaceNames";

Blockly.Blocks["alloy_sigIn_empty"] = {
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
      .appendField("in")
      .appendField(new Blockly.FieldDropdown(signatureDropdownOptions), "INNAME")
      .appendField("{ }");


    this.setColour(230);
    this.setTooltip(
      "Declares a signature that is a subset of a parent — all of its atoms must belong to an existing parent signature or expression  " +
        "Example: sig Student in Person { }",
    );
  },
};
