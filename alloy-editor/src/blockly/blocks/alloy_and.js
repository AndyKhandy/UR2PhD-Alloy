import * as Blockly from "blockly";

Blockly.Blocks["alloy_and"] = {
    init: function () {
        

        this.appendValueInput("A").setCheck(null);

        this.appendDummyInput().appendField("^");

        this.appendValueInput("B").setCheck(null);

        this.setPreviousStatement(true);


        this.setOutput(true,null);
        this.setColour(160)


    }
}