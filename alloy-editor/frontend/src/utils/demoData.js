import { MarkerType } from "@xyflow/react";

export const initialCode = "sig Person {\n\tfriends: some Person\n}\nrun {} for 5"

export const initialNodes = [
  {
    id: "n1",
    position: { x: 0, y: 0 },
    data: { label: "Node 1", color: "#e110ad" },
    type: "input",
    width: 200,
    height: 75,
    style: { background: "#e110ad" },
  },
  {
    id: "n2",
    position: { x: 300, y: 100 },
    data: { label: "Node 2", color: "#ff8f17" },
    style: { background: "#ff8f17" },
    width: 200,
    height: 75,
  },
  {
    id: "n3",
    position: { x: 0, y: 300 },
    data: { label: "Node 3", color: "#2f80ea" },
    style: { background: '#2a84f1"' },
    width: 200,
    height: 75,
  },
];

export const initialEdges = [
  {
    id: "n1-n2",
    source: "n1",
    target: "n2",
    label: "Howdy",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 15,
      height: 15,
    },
  },
  {
    id: "n1-n3",
    source: "n1",
    target: "n3",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 15,
      height: 15,
    },
  },
];
