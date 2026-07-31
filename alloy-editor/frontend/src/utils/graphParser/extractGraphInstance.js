import getNodesAndEdges, {
  assignEdgeHandles,
} from "./reactFlowConverter";
import layoutNodes from "../layout/layoutNodes";

export default async function getGraphInstance(alloyResult, index = 0) {
  const instance = alloyResult?.instances?.[index];

  if (!instance) {
    return { nodes: [], edges: [] };
  }

  const [nodes, edges] = getNodesAndEdges(instance);
  const updatedNodes = await layoutNodes(nodes, edges);
  const updatedEdges = assignEdgeHandles(
    edges,
    updatedNodes,
    instance.relations,
  );

  return {
    nodes: updatedNodes,
    edges: updatedEdges,
  };
}
