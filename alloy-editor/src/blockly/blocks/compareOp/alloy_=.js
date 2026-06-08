import * as Blockly from "blockly";

Blockly.Blocks["alloy_="] = {
    init: function() {
        this.appendValueInput("LEFT").setCheck("Expression");

        this.appendDummyInput().appendField("=");

        this.appendValueInput("RIGHT").setCheck("Expression");

        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setColour(160);

        this.setTooltip(
            "Equality — true when both sides denote the same set/relation. " +
                "Both sockets take a set/expression (Expression). " +
                "Example: p.spouse.spouse = p"
        );
    }
}