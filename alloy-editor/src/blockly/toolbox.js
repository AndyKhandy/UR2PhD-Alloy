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
        { kind: "block", type: "alloy_relation" },
      ],
    },
    {
      kind: "category",
      name: "Expressions/Sets",
      colour: "#00058C",
      contents: [
        {
          kind: "block",
          type: "alloy_sig_reference",
        },
        {
          kind: "label",
          text: "-- Set Connectors --",
          "web-class": "alloy-toolbox-heading",
        },
        { kind: "block", type: "alloy_&" },
        { kind: "block", type: "alloy_+" },
        { kind: "block", type: "alloy_-" },
        { kind: "block", type: "alloy_." },
        {
          kind: "label",
          text: "-- Set Operators --",
          "web-class": "alloy-toolbox-heading",
        },
        {
          kind: "block",
          type: "alloy_^",
        },
        {
          kind: "block",
          type: "alloy_~",
        },
        {
          kind: "block",
          type: "alloy_*",
        },
      ],
    },
    {
      kind: "category",
      name: "Boolean",
      colour: "#8C0000",
      contents: [
        { kind: "block", type: "alloy_!" },
        { kind: "block", type: "alloy_set" },
        {
          kind: "label",
          text: "-- Boolean Connectors --",
          "web-class": "alloy-toolbox-heading",
        },
        { kind: "block", type: "alloy_and" },
        { kind: "block", type: "alloy_or" },
        { kind: "block", type: "alloy_implication" },
        { kind: "block", type: "alloy_biconditional" },

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
      name: "Pred and Facts",
      colour: "#B38E4F",
      contents: [
        { kind: "block", type: "alloy_fact" },
        { kind: "block", type: "alloy_pred" },
        { kind: "block", type: "alloy_rule_line" },
      ],
    },
    {
      kind: "category",
      name: "Commands",
      colour: "#3BA61B",
      contents: [
        { kind: "block", type: "alloy_run" },
        { kind: "block", type: "alloy_check" },
      ],
    },
  ],
};
