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


How Generation Happens

Eventually you'll have a button:

<button onClick={generateAlloy}>
  Generate Alloy
</button>

Function:

function generateAlloy() {

  const code =
    alloyGenerator.workspaceToCode(
      workspaceRef.current
    );

  console.log(code);
}

This is the magic call.

Blockly:

Workspace
 ↓
Walk every block
 ↓
Call generator functions
 ↓
Combine results
 ↓
Return Alloy source
Example End Result

Workspace:

sig Person

pred show
 └─ Person

Generated:

sig Person {}

pred show {
    Person
}