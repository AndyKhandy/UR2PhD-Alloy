import { useState, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  MiniMap,
  Panel
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "../styles/GraphPlane.css"


const initialNodes = [
  { id: "n1", position: { x: 0, y: 0 }, data: { label: "Node 1" }, type: "input"},
  { id: "n2", position: { x: 100, y: 100 }, data: { label: "Node 2" } },
  { id: "n3", position: { x: 0, y: 200 }, data: { label: "Node 3" } },
];
const initialEdges = [
  { id: "n1-n2", source: "n1", target: "n2", label: "Howdy" },
  { id: "n1-n3", source: "n1", target: "n3" },
];

export default function GraphPlane() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        border: "4px solid #ccc",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        fitViewOptions={{
          padding: 0.2,
        }}
      >
        <Background></Background>
        <MiniMap></MiniMap>
        <Panel position="top-left">
            <h1>Alloy Result</h1>
        </Panel>
        <Controls></Controls>
      </ReactFlow>
    </div>
  );
}
