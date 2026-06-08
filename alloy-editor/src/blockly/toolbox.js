export const toolbox = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "Signatures",
      colour: "#5C81A6",
      contents: [
        { kind: "block", type: "alloy_sig" },
        {
          kind: "block",
          type: "alloy_sigEx",
        },
      ],
    },
    {
      kind: "category",
      name: "Expressions",
      colour: "#4dffa9",
      contents: [
        {
          kind: "block",
          type: "alloy_sig_reference",
        },
      ],
    },
    {
      kind: "category",
      name: "Relations",
      colour: "#09efdc",
      contents: [
        { kind: "block", type: "alloy_relation" },
        {
          kind: "label",
          text: "-- Comparison Operators --",
          "web-class": "alloy-toolbox-heading",
        },
        { kind: "block", type: "alloy_in" },
        { kind: "block", type: "alloy_!in" },
        { kind: "block", type: "alloy_=" },
        { kind: "block", type: "alloy_!=" },
      ],
    },
    {
      kind: "category",
      name: "Logic",
      colour: "#3adb85",
      contents: [
        {
          kind: "label",
          text: "-- Boolean Connectors --",
          "web-class": "alloy-toolbox-heading",
        },
        { kind: "block", type: "alloy_and" },
        { kind: "block", type: "alloy_or" },
        { kind: "block", type: "alloy_implication" },
        { kind: "block", type: "alloy_biconditional" },
      ],
    },
    {
      kind: "category",
      name: "Pred and Facts",
      colour: "#004cff",
      contents: [
        { kind: "block", type: "alloy_fact" },
        { kind: "block", type: "alloy_pred" },
        { kind: "block", type: "alloy_rule_line" },
      ],
    },
    {
      kind: "category",
      name: "Commands",
      colour: "#db3a3a",
      contents: [
        { kind: "block", type: "alloy_run" },
        { kind: "block", type: "alloy_check" },
      ],
    },
  ],
};
