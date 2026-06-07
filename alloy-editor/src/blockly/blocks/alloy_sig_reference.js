import * as Blockly from "blockly";

Blockly.Blocks["alloy_sig_reference"] = {
    init: function(){
        this.appendDummyInput().appendField(new Blockly.FieldTextInput("TargetSig"), "SIG_NAME");
        this.setOutput(true, "Expression");
        this.setInputsInline(true);
        this.setColour(120);
    }
}