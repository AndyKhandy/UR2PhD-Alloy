import * as Blockly from "blockly";

Blockly.Blocks["alloy_!in"] = {
    init: function() {
        this.appendValueInput("LEFT").setCheck("Expression");

        this.appendDummyInput().appendField("!in");

        this.appendValueInput("RIGHT").setCheck("Expression");

        this.setInputsInline(true);

        this.setOutput(true, "Boolean");

        this.setColour(160);

        this.setTooltip(
            "Negated subset test — true when the left set is NOT contained in " +
                "the right set. Both sockets take a set/expression (Expression). " +
                "Example: Teacher !in Student"
        );
    }
}