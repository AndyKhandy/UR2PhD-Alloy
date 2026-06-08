import * as Blockly from "blockly";

Blockly.Blocks["alloy_^"] = {
  init: function () {
    this.appendDummyInput().appendField("^");
    this.appendValueInput("A").setCheck("Expression");

    this.setOutput(true, "Expression");
    this.setInputsInline(true);
    this.setColour(160);
    this.setTooltip(
      "Transitive closure (^) — the relation joined with itself one or more " +
        "times (atoms reachable in 1+ steps). The socket takes a binary " +
        "relation/expression (Expression). Example: ^parent",
    );
  },
};
