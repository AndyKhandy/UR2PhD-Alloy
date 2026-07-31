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

export const localAlloyResult = JSON.parse(
  localStorage.getItem("alloyResult"),
) || {
  satisfiable: false,
  instances: [],
  instanceCount: 0,
  limitReached: false,
};

export const saveAlloyResult = (result) => {
  try {
    localStorage.setItem("alloyResult", JSON.stringify(result));
  } catch (error) {
    console.warn("Unable to save Alloy result:", error);
  }
};

export const localInstanceIndex = Number.parseInt(
  localStorage.getItem("instanceIndex"),
  10,
) || 0;

export const saveLocalInstanceIndex = (index) => {
  localStorage.setItem("instanceIndex", String(index));
};
