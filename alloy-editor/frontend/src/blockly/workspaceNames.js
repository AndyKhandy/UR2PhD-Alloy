// All Blockly block types that declare an Alloy signature.
export const SIGNATURE_BLOCK_TYPES = [
  "alloy_sig",
  "alloy_sig_empty",
  "alloy_sigEx",
  "alloy_sigEx_empty",
];

/** Returns the names declared by signature blocks in a workspace. */
export function getSignatureNames(workspace) {
  if (!workspace) return [];

  return [
    ...new Set(
      workspace
        .getAllBlocks(false)
        .filter((block) => SIGNATURE_BLOCK_TYPES.includes(block.type))
        .map((block) => block.getFieldValue("NAME")?.trim())
        .filter(Boolean),
    ),
  ];
}

/** FieldDropdown evaluates this function whenever its menu opens. */
export function signatureDropdownOptions(field) {
  const names = getSignatureNames(field?.getSourceBlock()?.workspace);

  return names.length
    ? names.map((name) => [name, name])
    : [["No signatures available", ""]];
}
