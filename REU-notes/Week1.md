# Week 1

- Main Idea
  - blocklyDiv.current = WHERE Blockly lives (DOM)
  - workspaceRef.current = WHAT Blockly is (engine + state)

inject() takes a DOM element and turns it into a full visual programming environment, and returns an object that represents the entire editor state.

## Code Structure

```text
blockly/
│
├── blocks/
│   ├── signatures/
│   ├── relations/
│   ├── logic/
│   ├── predicates/
│   └── commands/
│
├── generators/
│
├── toolbox/
│
└── themes/
```

## RESTRAINTS

A. Horizontal Restraints (Value Inputs & Outputs)
Horizontal blocks behave like math terms. They use setOutput to pass a value to a receiving socket (appendValueInput).

- How you declare the Plug: this.setOutput(true, "YourTagName");

- How you declare the Socket: this.appendValueInput("NAME").setCheck("YourTagName");

B. Vertical Restraints (Statement Connections)
Vertical blocks behave like lines of structural code. They don't pass data values; they just define sequence or structural nesting. They use setPreviousStatement and setNextStatement to stack inside a mouth (appendStatementInput).

- How you declare the Plug: this.setPreviousStatement(true, "YourTagName");
  this.setNextStatement(true, "YourTagName");

- How you declare the Socket (The Mouth): this.appendStatementInput("BODY").setCheck("YourTagName");

## BLOCK INPUTS

1. **Dummy Input**

- Used for labels and editable text fields.

    - Example:

    - this.appendDummyInput()
.appendField("sig")
.appendField(
new Blockly.FieldTextInput("Person"),
"NAME"
);

2. **Value Input**

- Used for expressions.
  - Example:

  - this.appendValueInput("LEFT");
  - this.appendValueInput("RIGHT");

  These create sockets that accept other blocks.\*

3. **Statement Input**

- Used for container blocks.
  - Example:

  - this.appendStatementInput("BODY");
