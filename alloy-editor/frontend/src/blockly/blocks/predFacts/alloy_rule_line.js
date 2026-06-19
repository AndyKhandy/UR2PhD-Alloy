import * as Blockly from "blockly";

Blockly.Blocks["alloy_rule_line"] = {
    init: function(){
        this.appendValueInput("RULE").setCheck("Boolean");
        this.setPreviousStatement(true, "LogicalStatement");
        this.setNextStatement(true, "LogicalStatement");
        this.setColour(160);

        this.setTooltip(
            "Holds one constraint line inside a fact or predicate body. " +
                "Its socket accepts a true/false formula (Boolean). " +
                "Example: Student in Person"
        );
    }
}