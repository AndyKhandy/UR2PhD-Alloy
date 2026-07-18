import { useState, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  MiniMap,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "../styles/GraphPlane.css";

export default function GraphPlane({ nodes, edges, setEdges, setNodes }) {
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
        <MiniMap
          bgColor="#000000"
          maskColor="rgba(82, 157, 242, 0.15)"
          nodeStrokeColor="#fdfdff"
          nodeStrokeWidth={1}
          nodeBorderRadius={4}
          pannable
          zoomable
          nodeColor={(node) => node.data.color}
        />
        <Panel position="top-left">
          <h1>Alloy Result</h1>
        </Panel>
        <Controls></Controls>
      </ReactFlow>
    </div>
  );
}
