import * as Blockly from "blockly";
import {
  FACT_BLOCK_TYPES,
  createUniqueNameValidator,
} from "../../workspaceNames";

Blockly.Blocks["alloy_fact"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("fact ")
      .appendField(
        new Blockly.FieldTextInput(
          "name",
          createUniqueNameValidator(FACT_BLOCK_TYPES),
        ),
        "NAME",
      )
      .appendField(" {");

    this.appendStatementInput("BODY").setCheck("LogicalStatement");

    this.appendDummyInput().appendField("}");

    this.setInputsInline(true);
    this.setColour("B38E4F");
    this.setTooltip(
      "Defines a fact — a constraint that must ALWAYS hold in every instance " +
        "of the model. Stack constraint lines inside the braces. " +
        "Example: fact { all p: Person | p not in p.parent }",
    );
  },
};
