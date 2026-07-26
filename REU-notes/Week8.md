### Styling the Code View
console.log(code.split("\n")) -> gives you the number of lines of the code

Array(4)

"sig Person {"
"     friends: some Person"
"}"
"run {some friends} for 5"

it will give me 4 strings which is the number of lines!

### Restrictive Feature for Sigs, Pred, and Facts

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