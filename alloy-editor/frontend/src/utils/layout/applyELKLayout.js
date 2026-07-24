export default function applyElkLayout(flowNodes, layoutObject) {
  const nodes = flowNodes.map((node) => {
    const elkNode = layoutObject.children.find(
      (child) => child.id === node.id,
    );

    if (!elkNode) {
      throw new Error(`ELK layout did not contain node "${node.id}"`);
    }

    return {
      ...node,
      position: { x: elkNode.x, y: elkNode.y },
    };
  });

  return nodes;
}
