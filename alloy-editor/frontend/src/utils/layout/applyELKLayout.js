import { NODE_HEIGHT, NODE_WIDTH } from "../data";

const NODE_GAP = 40;

function ensureHorizontalSeparation(nodes) {
  const placedNodes = [];

  return nodes.map((node) => {
    let x = node.position.x;

    // Keep a 20px gap between horizontally overlapping node boxes. Nodes in
    // different vertical layers may keep the same x coordinate.
    while (
      placedNodes.some(
        (placedNode) =>
          Math.abs(x - placedNode.position.x) < NODE_GAP,
      )
    ) {
      x += NODE_GAP;
    }

    const positionedNode = x === node.position.x
      ? node
      : { ...node, position: { ...node.position, x } };

    placedNodes.push(positionedNode);
    return positionedNode;
  });
}

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

  return ensureHorizontalSeparation(nodes);
}
