import * as Blockly from "blockly";

Blockly.Blocks["alloy_in"] = {
    init: function() {
        this.appendValueInput("LEFT").setCheck("Expression");

        this.appendDummyInput().appendField("in");

        this.appendValueInput("RIGHT").setCheck("Expression");

        this.setInputsInline(true);

        this.setOutput(true, "Boolean");

        this.setColour(160);
    }
}