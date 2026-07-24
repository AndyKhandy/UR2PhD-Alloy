import { MarkerType } from "@xyflow/react";

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
      return {
        id: instance,
        position: { x: 0, y: 0 },
        data: { label: instance, signature: name },
      };
    }),
  );
}

export function convertToEdges(relations) {
  return relations.map((relation) => ({
    id: `${relation.source}-${relation.fieldName}-${relation.target}`,
    source: relation.source,
    target: relation.target,
    label: relation.fieldName,
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  }));
}
