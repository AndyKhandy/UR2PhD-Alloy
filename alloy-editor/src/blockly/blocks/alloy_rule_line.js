import * as Blockly from "blockly";

Blockly.Blocks["alloy_rule_line"] = {
    init: function(){
        this.appendValueInput("RULE").setCheck("Boolean");
        this.setPreviousStatement(true, "LogicalStatement");
        this.setNextStatement(true, "LogicalStatement");
        this.setColour(160);
    }
}