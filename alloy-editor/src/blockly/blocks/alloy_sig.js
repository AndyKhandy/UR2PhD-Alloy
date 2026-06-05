import * as Blockly from "blockly";

Blockly.Blocks["alloy_sig"] = {
    init: function () {
        this.appendDummyInput().appendField("sig").appendField(new Blockly.FieldTextInput("Person"),"NAME").appendField("{");

        this.appendStatementInput("BODY");

        this.appendDummyInput().appendField("}");

        this.setPreviousStatement(true);
        this.setNextStatement(true);

        this.setColour(230);
    }
}