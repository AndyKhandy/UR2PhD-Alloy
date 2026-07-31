import { useCallback } from "react";
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
import SelfLoopEdge from "./graph/SelfLoopEdge";
import AlloyNode from "./graph/AlloyNode";
import { RotateCcw, ArrowBigLeft, ArrowBigRight } from "lucide-react";
import getGraphInstance from "../utils/graphParser/extractGraphInstance";

const nodeTypes = {
  alloy: AlloyNode,
};

const edgeTypes = {
  selfLoop: SelfLoopEdge,
};

export default function GraphPlane({
  nodes,
  edges,
  setEdges,
  setNodes,
  originalGraph,
  setOriginalGraph,
  instanceIndex,
  setInstanceIndex,
  alloyResult,
}) {
  const previousButtonDisabled = instanceIndex === 0;

  const nextButtonDisabled =
    instanceIndex + 1 === alloyResult?.instanceCount;

  const resetGraph = () => {
    setNodes(structuredClone(originalGraph.nodes));
    setEdges(structuredClone(originalGraph.edges));
  };

  const getNextInstance = async () => {
    const newIndex = instanceIndex + 1;

    const { nodes: newNodes, edges: newEdges } = await getGraphInstance(
      alloyResult,
      newIndex,
    );
    setInstanceIndex(newIndex);
    setNodes(newNodes);
    setEdges(newEdges);
    setOriginalGraph({ nodes: newNodes, edges: newEdges });
  };

  const getPreviousInstance = async () => {
    const newIndex = instanceIndex - 1;

    const { nodes: newNodes, edges: newEdges } = await getGraphInstance(
      alloyResult,
      newIndex,
    );
    setInstanceIndex(newIndex);
    setNodes(newNodes);
    setEdges(newEdges);
    setOriginalGraph({ nodes: newNodes, edges: newEdges });
  };

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
      <div className="buttons">
        <button onClick={resetGraph} className="reset-btn">
          <RotateCcw color="purple" />
        </button>
        {alloyResult?.satisfiable && (
          <div className="instance-buttons flex">
            <button disabled={previousButtonDisabled} onClick={getPreviousInstance}>
              <ArrowBigLeft />
            </button>
            <h4>{`${instanceIndex + 1} of ${alloyResult.instanceCount}`}</h4>
            <button disabled={nextButtonDisabled} onClick={getNextInstance}>
              <ArrowBigRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
