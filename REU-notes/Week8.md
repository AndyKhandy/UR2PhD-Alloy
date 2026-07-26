### Styling the Code View
console.log(code.split("\n")) -> gives you the number of lines of the code

Array(4)

"sig Person {"
"     friends: some Person"
"}"
"run {some friends} for 5"

it will give me 4 strings which is the number of lines!

### Restrictive Feature for Sigs, Pred, and Facts


#### FLOW

```
User creates or renames block
          ↓
  Blockly fires workspace change event
          ↓
  handleWorkspaceChange runs
          ↓
  All dynamic dropdowns are found
          ↓
  Each dropdown regenerates its options
          ↓
  New sig/pred names become available

  The dropdowns also regenerate when opened, but refreshing in handleWorkspaceChange ensures their cached options are synchronized immediately.
```

you can use field?.getSourceBlock()?.workspace to get the current workspace ref value. 

```
return [
    ...new Set(
    workspace
    .getAllBlocks(false)
    .filter((block) => SIGNATURE_BLOCK_TYPES.includes(block.type))
    .map((block) => block.getFieldValue("NAME")?.trim())
    .filter(Boolean),
    ),
];
```

What this does is it goes through all the blocks in workspace and if the blocks are a signature (they have the type "alloy_sig", "alloy_sig_empty", "alloy_sigEx", or "alloy_sigEx_empty") we can use them to get there signature name value for our dropdown

 - Signatures:
      - Collects names from all four signature block types.
      - Signature references, parent signatures, and relation targets use dynamic dropdowns.
      - Duplicate signature names are rejected.

  - Predicates:
      - Predicate names are collected.
      - The run block now uses a dropdown containing only defined predicates.
      - Duplicate predicate names are rejected.

  - Facts:
      - Fact names are collected and logged.
      - Duplicate fact names are rejected.

  The shared logic is in alloy-editor/frontend/src/blockly/workspaceNames.js:1.

  The console now displays:

  {
    sigs: ["Person", "Student"],
    predicates: ["hasParent"],
    facts: ["NoCycles"]
  }

  ### Refresh Capability of Dropdowns 
  
  export function refreshDynamicNameDropdowns(workspace) {
    workspace?.getAllBlocks(false).forEach((block) => {
      block.inputList.forEach((input) => {
        input.fieldRow.forEach((field) => {
          if (field.isOptionListDynamic?.()) {
            field.getOptions(false);
          }
        });
      });
    });
  }

   1. workspace.getAllBlocks(false)

     Gets every block currently in the workspace, including blocks nested inside other blocks.

  2. block.inputList

     Blockly stores each block’s inputs here. This includes dummy inputs and statement/value inputs.

  3. input.fieldRow

     Each input contains its fields. For example, a signature reference has a FieldDropdown.

  4. field.isOptionListDynamic?.()

     Checks whether the field uses a function to generate its dropdown options.

     For example:

     new Blockly.FieldDropdown(signatureDropdownOptions)

     is dynamic, while this is static:

     new Blockly.FieldDropdown([
       ["one", "one"],
       ["some", "some"],
     ])

  5. field.getOptions(false)

     This asks Blockly to regenerate the dropdown options.

     The false means “do not use the cached options.” Blockly calls the dropdown generator again, which now sees the latest workspace contents.