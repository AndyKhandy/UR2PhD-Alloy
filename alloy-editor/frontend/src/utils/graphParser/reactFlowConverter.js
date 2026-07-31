import { MarkerType } from "@xyflow/react";
import {
  sigColors,
  HANDLE_COUNT,
  HANDLE_SPACING,
  NODE_HEIGHT,
  NODE_WIDTH,
} from "../data";

const HORIZONTAL_HANDLE_COUNT = Math.floor(NODE_WIDTH / HANDLE_SPACING);

const getNodeCenter = (node) => ({
  x: node.position.x + NODE_WIDTH / 2,
  y: node.position.y + NODE_HEIGHT / 2,
});

const getHandleCount = (side) =>
  side === "right" || side === "left"
    ? HANDLE_COUNT
    : HORIZONTAL_HANDLE_COUNT;

const nextHandle = (usage, nodeId, side) => {
  const key = `${nodeId}:${side}`;
  const index = usage.get(key) ?? 0;
  usage.set(key, (index + 1) % getHandleCount(side));
  return `${side}-${index}`;
};

export default function getNodesAndEdges(alloyResult) {
  if (alloyResult) {
    return [
      convertToNodes(alloyResult.atoms),
      convertToEdges(alloyResult.relations),
    ];
  } else {
    return [[], []];
  }
}

export function convertToNodes(atoms) {
  return Object.entries(atoms).flatMap(([name, instances], index) =>
    instances.map((instance, instanceIndex) => {
      return {
        id: instance,
        type: "alloy",
        position: { x: 0, y: 0 },
        data: { label: instance, signature: name, color: sigColors[index] },
        style: { background: sigColors[index] },
      };
    }),
  );
}

export function convertToEdges(relations) {
  return relations.map((relation, index) => {
    const handleIndex = index % HANDLE_COUNT;
    const isSelfLoop = relation.source === relation.target;

    return {
      id: `${relation.source}-${relation.fieldName}-${relation.target}`,
      source: relation.source,
      target: relation.target,
      sourceHandle: relation.sourceHandle ?? `right-${handleIndex}`,
      targetHandle:
        relation.targetHandle ??
        `${isSelfLoop ? "top" : "left"}-${handleIndex}`,
      label: relation.fieldName,
      type: isSelfLoop ? "selfLoop" : "default",
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 15,
        height: 15,
      },
    };
  });
}

/**
 * Selects handles after layout, when the relative position of each endpoint
 * is known. AlloyNode exposes right/left handles for horizontal connections
 * and bottom/top handles for vertical connections.
 */
export function assignEdgeHandles(edges, nodes, relations = []) {
  const nodesById = new Map(nodes.map((node) => [node.id, node]));
  const usage = new Map();

  return edges.map((edge, index) => {
    if (edge.source === edge.target) return edge;

    const sourceNode = nodesById.get(edge.source);
    const targetNode = nodesById.get(edge.target);

    if (!sourceNode || !targetNode) return edge;

    const source = getNodeCenter(sourceNode);
    const target = getNodeCenter(targetNode);
    const horizontal = Math.abs(target.x - source.x) > Math.abs(target.y - source.y);
    const sourceSide = horizontal ? "right" : "bottom";
    const targetSide = horizontal ? "left" : "top";
    const relation = relations[index];
    const sourceHandleIsAutomatic = !relation || relation.sourceHandle == null;
    const targetHandleIsAutomatic = !relation || relation.targetHandle == null;

    return {
      ...edge,
      sourceHandle:
        sourceHandleIsAutomatic
          ? nextHandle(usage, edge.source, sourceSide)
          : edge.sourceHandle,
      targetHandle:
        targetHandleIsAutomatic
          ? nextHandle(usage, edge.target, targetSide)
          : edge.targetHandle,
    };
  });
}
