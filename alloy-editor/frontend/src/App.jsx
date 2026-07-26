import BlocklyEditor from "./components/BlocklyEditor";
import GraphPlane from "./components/GraphPlane";
import CodeView from "./components/CodeView";
import "./styles/App.css";
import { useEffect, useRef, useState } from "react";
import { initialEdges, initialNodes, initialCode } from "./utils/demoData";
import {
  localGraph,
  localWorkspaceRef,
  saveLocalGraph,
} from "./utils/localStorage";

function App() {
  const [mode, setMode] = useState("editor");
  const [nodes, setNodes] = useState(localGraph.nodes || initialNodes);
  const [edges, setEdges] = useState(localGraph.edges || initialEdges);
  const [alloyCode, setAlloyCode] = useState(initialCode);
  const [originalGraph, setOriginalGraph] = useState({
    nodes: localGraph.nodes || initialNodes,
    edges: localGraph.edges || initialEdges,
  });
  const savedWorkspaceRef = useRef(localWorkspaceRef);

  useEffect(() => {
    saveLocalGraph({ nodes, edges });
  }, [nodes, edges]);

  const changeMode = (modeClicked) => {
    setMode(modeClicked);
  };

  return (
    <>
      <div className="header">
        <h1>AlloyBlocks</h1>
        <div className="header-btns">
          <button
            onClick={() => changeMode("editor")}
            className={`header-btn ${mode == "editor" ? "active" : ""}`}
          >
            Editor
          </button>
          <button
            onClick={() => changeMode("code")}
            className={`header-btn ${mode == "code" ? "active" : ""}`}
          >
            Code
          </button>
          <button
            onClick={() => changeMode("graph")}
            className={`header-btn ${mode == "graph" ? "active" : ""}`}
          >
            Result
          </button>
        </div>
      </div>
      {mode == "editor" && (
        <BlocklyEditor
          setEdges={setEdges}
          setNodes={setNodes}
          changeMode={changeMode}
          setOriginalGraph={setOriginalGraph}
          savedWorkspaceRef={savedWorkspaceRef}
          setAlloyCode={setAlloyCode}
        ></BlocklyEditor>
      )}
      {mode == "code" && <CodeView alloyCode={alloyCode}></CodeView>}
      {mode == "graph" && (
        <div className="graphContainer">
          <GraphPlane
            nodes={nodes}
            edges={edges}
            setNodes={setNodes}
            setEdges={setEdges}
            originalGraph={originalGraph}
          ></GraphPlane>
        </div>
      )}
    </>
  );
}

export default App;
