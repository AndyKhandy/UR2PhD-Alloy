import * as Blockly from "blockly";
import {
  SIGNATURE_BLOCK_TYPES,
  createUniqueNameValidator,
} from "../../workspaceNames";

Blockly.Blocks["alloy_sig_empty"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("sig")
      .appendField(
        new Blockly.FieldTextInput(
          "Person",
          createUniqueNameValidator(SIGNATURE_BLOCK_TYPES),
        ),
        "NAME",
      )
      .appendField("{ }");


    this.setColour(230);
    this.setTooltip(
      "Declares a signature — a named set of atoms (like a type/class). " +
        "Field blocks nest inside the braces. Example: sig Person { }",
    );
  },
};
