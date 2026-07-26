// All Blockly block types that declare an Alloy signature.
export const SIGNATURE_BLOCK_TYPES = [
  "alloy_sig",
  "alloy_sig_empty",
  "alloy_sigEx",
  "alloy_sigEx_empty",
];

export const PREDICATE_BLOCK_TYPES = ["alloy_pred"];
export const FACT_BLOCK_TYPES = ["alloy_fact"];

/** Returns the names declared by signature blocks in a workspace. */
export function getNamesForBlockTypes(workspace, blockTypes) {
  if (!workspace) return [];

  return [
    ...new Set(
      workspace
        .getAllBlocks(false)
        .filter((block) => blockTypes.includes(block.type))
        .map((block) => block.getFieldValue("NAME")?.trim())
        .filter(Boolean),
    ),
  ];
}

export function getSignatureNames(workspace) {
  return getNamesForBlockTypes(workspace, SIGNATURE_BLOCK_TYPES);
}

export function getPredicateNames(workspace) {
  return getNamesForBlockTypes(workspace, PREDICATE_BLOCK_TYPES);
}

export function getFactNames(workspace) {
  return getNamesForBlockTypes(workspace, FACT_BLOCK_TYPES);
}

export function getAllAlloyNames(workspace) {
  return {
    sigs: getSignatureNames(workspace),
    predicates: getPredicateNames(workspace),
    facts: getFactNames(workspace),
  };
}

/** Keeps two declarations of the same category from using the same name. */
export function createUniqueNameValidator(blockTypes) {
  return function (value) {
    const name = value.trim();
    const field = this;
    const block = field?.getSourceBlock();
    const workspace = block?.workspace;

    if (!workspace || !name) return null;

    const duplicate = workspace.getAllBlocks(false).some(
      (other) =>
        other.id !== block.id &&
        blockTypes.includes(other.type) &&
        other.getFieldValue("NAME")?.trim() === name,
    );

    // Returning null tells Blockly to reject the proposed value and retain
    // the previous value.
    return duplicate ? null : name;
  };
}

/** Builds signature options while optionally excluding one signature name. */
export function getSignatureDropdownOptions(workspace, excludedName = "") {
  const names = getSignatureNames(workspace).filter(
    (name) => name !== excludedName,
  );

  return names.length
    ? names.map((name) => [name, name])
    : [["", ""]];
}

/** FieldDropdown evaluates this function whenever its menu opens. */
export function signatureDropdownOptions() {
  const sourceBlock = this?.getSourceBlock();
  const isSignatureExtension = [
    "alloy_sigEx",
    "alloy_sigEx_empty",
  ].includes(sourceBlock?.type);
  const excludedName = isSignatureExtension
    ? sourceBlock.getFieldValue("NAME")?.trim()
    : "";

  return getSignatureDropdownOptions(sourceBlock?.workspace, excludedName);
}

export function predicateDropdownOptions() {
  const names = getPredicateNames(this?.getSourceBlock()?.workspace);

  return names.length
    ? names.map((name) => [name, name])
    : [["", ""]];
}

/** Re-generates cached options for every dynamic name dropdown. */
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
