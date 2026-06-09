import * as Blockly from "blockly";

Blockly.Blocks["alloy_in"] = {
    init: function() {
        this.appendValueInput("LEFT").setCheck("Expression");

        this.appendDummyInput().appendField("in");

        this.appendValueInput("RIGHT").setCheck("Expression");

        this.setInputsInline(true);

        this.setOutput(true, "Boolean");

        this.setColour("C97C00");

        this.setTooltip(
            "Subset test — true when the left set is contained in the right set. " +
                "Both sockets take a set/expression (Expression). " +
                "Example: Student in Person"
        );
    }
}