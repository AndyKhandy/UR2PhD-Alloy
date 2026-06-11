Tasks for the week of 6/8:

* Pick colors for the blocks
    * Current through: blue/purple for sets
    * Current thought: red/orange for boolean (boolean will additionally end up with quantifier and LTL blocks but these could be yellow and brown)
* Change the shapes so that the set and boolean blocks are different shapes
* Translate the blocks into a string that captures the Alloy model created by the blocks

## Generators

* Dummy Input Fields - use **block.getFieldValue("FIELDNAME")**
* Value Blocks - sockets contain other blocks so use **alloyGenerator.valueToCode(block, "BLOCKNAME")**
* Statement Blocks - contains a body so use **alloyGenerator.statementToCode(block, "BODYNAME")**

The rule: 
* any block with setOutput(true, ...) (a value-producing block) must return [string, order]. 
* Blocks with setPreviousStatement/setNextStatement (statement blocks) return a plain string. 

The order integer is Blockly's precedence hint for auto-parenthesization — 0 means "treat as atomic, never add extra parens."
[is needed in valueToCode as a third input]