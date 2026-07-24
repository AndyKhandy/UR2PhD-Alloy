import BlocklyEditor from "./components/BlocklyEditor";
import GraphPlane from "./components/GraphPlane";
import "./styles/App.css";
import { useState } from "react";
import { useNodesState,useEdgesState } from "@xyflow/react";
import { initialEdges,initialNodes } from "./utils/demoResult";

function App() {
  const [isEditor, setIsEditor] = useState(true);
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [originalGraph, setOriginalGraph] = useState({nodes: initialNodes,edges: initialEdges})

  const changeMode = () => {
    setIsEditor(!isEditor);
  };

  return (
    <>
      <div className="header">
        <h1>AlloyBlocks</h1>
        <div className="header-btns">
          <button
            onClick={changeMode}
            className={`header-btn ${isEditor ? "active" : ""}`}
          >
            Editor
          </button>
          <button
            onClick={changeMode}
            className={`header-btn ${!isEditor ? "active" : ""}`}
          >
            Result
          </button>
        </div>
      </div>
      {isEditor ? (
        <BlocklyEditor setEdges={setEdges} setNodes={setNodes} setIsEditor={setIsEditor} setOriginalGraph={setOriginalGraph}></BlocklyEditor>
      ) : (
        <div className="graphContainer">
          <GraphPlane nodes={nodes} edges={edges}setNodes={setNodes} setEdges={setEdges} originalGraph={originalGraph}></GraphPlane>
        </div>
      )}
    </>
  );
}

export default App;
