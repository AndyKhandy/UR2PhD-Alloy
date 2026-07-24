import { BaseEdge, BezierEdge } from "@xyflow/react";

export default function SelfLoopEdge(props) {
  if (props.source !== props.target) {
    return <BezierEdge {...props} />;
  }

  const { sourceX, sourceY, markerEnd } = props;

  const size = 28;

  const width = 40;
  const height = 50;

  const path = `
M ${sourceX - 10} ${sourceY}

C
${sourceX - width} ${sourceY - 10},
${sourceX - width} ${sourceY - height},
${sourceX} ${sourceY - height}

C
${sourceX + width} ${sourceY - height},
${sourceX + width} ${sourceY - 10},
${sourceX + 10} ${sourceY}
`;

  return <BaseEdge path={path} markerEnd={markerEnd} />;
}
