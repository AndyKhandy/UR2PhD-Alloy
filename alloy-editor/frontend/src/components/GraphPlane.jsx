import { useState, useCallback, useRef } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  MiniMap,
  Panel,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "../styles/GraphPlane.css";
import SelfLoopEdge from "./graph/SelfLoopEdge";
import AlloyNode from "./graph/AlloyNode";
import { RotateCcw } from "lucide-react";


const nodeTypes = {
  alloy: AlloyNode,
};

const edgeTypes = {
  selfLoop: SelfLoopEdge,
};

export default function GraphPlane({ nodes, edges, setEdges, setNodes, originalGraph }) {

  const resetGraph = () => {
    setNodes(structuredClone(originalGraph.nodes));
    setEdges(structuredClone(originalGraph.edges));
  }

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
      className="flowGraph"
    >
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        edges={edges}
        edgeTypes={edgeTypes}
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
          <h1>Graph Instance</h1>
        </Panel>
        <Controls></Controls>
      </ReactFlow>
      <button onClick={resetGraph} className="reset-btn" ><RotateCcw color="purple"/></button>
    </div>
  );
}
