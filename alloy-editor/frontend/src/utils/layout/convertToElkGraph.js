import { NODE_WIDTH, NODE_HEIGHT } from "../../components/graph/AlloyNode";

export default function convertToElkGraph(flowNodes, flowEdges) {
  const elkNodes = flowNodes.map((node) => {
    return {
      id: node.id,
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
    };
  });

  const elkEdges = flowEdges.map((edge) => {
    return {
      id: edge.id,
      sources: [edge.source],
      targets: [edge.target],
    };
  });

  return {
    id: "root",
    layoutOptions: {
      "elk.algorithm": "layered",
      "elk.direction": "DOWN",

      "elk.spacing.nodeNode": "80",
      "elk.spacing.edgeNode": "40",
      "elk.layered.spacing.nodeNodeBetweenLayers": "120",

      "elk.layered.crossingMinimization.strategy": "LAYER_SWEEP",

      "elk.layered.nodePlacement.strategy": "NETWORK_SIMPLEX",
    },
    children: elkNodes,
    edges: elkEdges,
  };
}
