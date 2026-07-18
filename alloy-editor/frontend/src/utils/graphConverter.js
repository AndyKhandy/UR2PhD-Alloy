export default function getNodesAndEdges(alloyResult) {
  if (alloyResult.satisfiable) {
    return [convertToNodes(alloyResult.atoms),convertToEdges(alloyResult.relations)]
  } else {
    return null;
  }
}

export function convertToNodes(atoms) {
  return Object.entries(atoms).flatMap(([name, instances], index) =>
    instances.map((instance, instanceIndex) => {
      return {
        id: instance,
        position: { x: (index + 1) * 100, y: (index+1) * ((instanceIndex+1) * 100) },
        data: { label: instance, signature: name },
      };
    }),
  );
}

export function convertToEdges(relations) {
  return relations.map((relation)=>({
    id: `${relation.source}-${relation.fieldName}-${relation.target}`,
    source: relation.source,
    target: relation.target,
    label: relation.fieldName
  }))
}
