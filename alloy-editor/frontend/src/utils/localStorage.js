// SAVE DATA ACROSS USAGE
export const localWorkspaceRef = JSON.parse(
  localStorage.getItem("savedWorkspace"),
) || {
  blocks: { languageVersion: 0, blocks: [] },
};

export const saveLocalWorkspaceRef = (refObject) => {
  localStorage.setItem("savedWorkspace", JSON.stringify(refObject));
};

export const localGraph = JSON.parse(
  localStorage.getItem("savedGraph"),
) || {
  nodes: null,
  edges: null,
};

export const saveLocalGraph = (graph) => {
  localStorage.setItem("savedGraph", JSON.stringify(graph));
};
