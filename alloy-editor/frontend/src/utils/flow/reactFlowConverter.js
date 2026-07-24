import { MarkerType } from "@xyflow/react";
import { sigColors, HANDLE_COUNT } from "../data";

export default function getNodesAndEdges(alloyResult) {
  if (alloyResult.satisfiable) {
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
      console.log(sigColors[index]);
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
