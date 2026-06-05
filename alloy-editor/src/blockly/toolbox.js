export const toolbox = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "toolboxlabel",
      name: "TOOLBOX HEADER TEXT",
      colour: "darkslategrey",
    },
    {
      kind: "category",
      name: "Signatures",
      colour: "#5C81A6",
      contents: [{ kind: "block", type: "alloy_sig" }],
    },
    {
      kind: "category",
      name: "Relations",
      colour: "#09efdc",
      contents: [{ kind: "block", type: "controls_if" }],
    },
    {
      kind: "category",
      name: "Logic",
      colour: "#3adb85",
      contents: [
        { kind: "block", type: "alloy_and" },
        { kind: "block", type: "controls_if" },
      ],
    },
    {
      kind: "category",
      name: "Commands",
      colour: "#db3a3a",
      contents: [
        { kind: "block", type: "alloy_run" },
        { kind: "block", type: "alloy_fact" },
      ],
    },
  ],
};
