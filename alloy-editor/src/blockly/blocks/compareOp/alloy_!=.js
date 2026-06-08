import * as Blockly from "blockly";

Blockly.Blocks["alloy_!="] = {
    init: function() {
        this.appendValueInput("LEFT").setCheck("Expression");

        this.appendDummyInput().appendField("!=");

        this.appendValueInput("RIGHT").setCheck("Expression");

        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setColour(160);

        this.setTooltip(
            "Inequality — true when the two sides denote different sets/relations. " +
                "Both sockets take a set/expression (Expression). " +
                "Example: a != b"
        );
    }
}