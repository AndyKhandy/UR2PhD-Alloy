import * as Blockly from "blockly";

Blockly.Blocks['alloy_relation'] = {
    init: function(){
        this.setPreviousStatement(true, "Relation");
        this.setNextStatement(true, "Relation");
        this.setColour(120);

        this.appendDummyInput().appendField("field").appendField(new Blockly.FieldTextInput("relationName"), "NAME").appendField(":").appendField(new Blockly.FieldDropdown([
            ["one", "one"],
            ["lone", "lone"],
            ["some","some"],
            ["set","set"]
        ]), "MULTIPLICITY")

        this.appendValueInput("TARGET_SET").setCheck("Expression");

        this.setInputsInline(true);

        this.setTooltip("Define a relation rule nested inside this host signature wrapper.");
    }
}
