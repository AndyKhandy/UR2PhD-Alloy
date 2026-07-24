import { useEffect, useRef, useState } from "react";
import * as Blockly from "blockly";
import "../blockly/blocks/index";
import "../blockly/generators/indexG";
import { toolbox } from "../blockly/toolbox";
import { alloyGenerator } from "../blockly/generators/alloy_generator";
import "../styles/blockly.css";
import getNodesAndEdges from "../utils/flow/reactFlowConverter";
import { Code, Trash, SquarePlay } from "lucide-react";
import layoutNodes from "../utils/layout/layoutNodes";

export default function BlocklyEditor({
  setNodes,
  setEdges,
  changeMode,
  setOriginalGraph,
  savedWorkspaceRef,
  setAlloyCode,
}) {
  const blocklyDiv = useRef(null);
  const workspaceRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false);
  const [runError, setRunError] = useState(null);

  useEffect(() => {
    if (workspaceRef.current) return;

    workspaceRef.current = Blockly.inject(blocklyDiv.current, {
      renderer: "zelos",
      toolbox,
      zoom: {
        controls: true,
        startScale: 0.9, // Default is 1.0
        maxScale: 1,
        minScale: 0.5,
        scaleSpeed: 1.1,
      },
    });

    if (savedWorkspaceRef.current) {
      Blockly.serialization.workspaces.load(
        savedWorkspaceRef.current,
        workspaceRef.current,
      );
    }

    const handleWorkspaceChange = (event) => {
      if (event.isUiEvent) return;

      const currentSnapshot = Blockly.serialization.workspaces.save(
        workspaceRef.current,
      );
      savedWorkspaceRef.current = currentSnapshot;
    };

    workspaceRef.current.addChangeListener(handleWorkspaceChange);

    return () => {
      if (workspaceRef.current) {
        const finalSnapshot = Blockly.serialization.workspaces.save(
          workspaceRef.current,
        );
        savedWorkspaceRef.current = finalSnapshot;
        workspaceRef.current.removeChangeListener(handleWorkspaceChange);
        workspaceRef.current?.dispose();
        workspaceRef.current = null;
      }
    };
  }, [savedWorkspaceRef]);

  const removeBlocks = () => {
    workspaceRef.current.clear();
    setNodes([]);
    setEdges([]);
    setAlloyCode("");
    setRunError(null);
  };

  function generateAlloy() {
    const code = alloyGenerator.workspaceToCode(workspaceRef.current);
    if (code) {
      setAlloyCode(code);
      console.log(code);
      changeMode("code");
      setRunError(null);
    }
  }

  async function runModel() {
    const code = alloyGenerator.workspaceToCode(workspaceRef.current);
    if (code) {
      setAlloyCode(code);
      setRunError(null);
      setIsRunning(true);
      try {
        const response = await fetch("http://localhost:8080/run-model", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ modelText: code }),
        });
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        const result = await response.json();
        const [nodes, edges] = getNodesAndEdges(result);
        const updatedNodes = await layoutNodes(nodes, edges);
        console.log(nodes, edges, updatedNodes);
        console.log(result);
        setNodes(updatedNodes);
        setEdges(edges);
        setOriginalGraph({ nodes: updatedNodes, edges });
      } catch (err) {
        setRunError(err.message);
      } finally {
        changeMode("graph");
        setIsRunning(false);
      }
    }
  }

  return (
    <div
      className="main"
      style={{ height: "100vh", display: "flex", flexDirection: "column" }}
    >
      <div ref={blocklyDiv} style={{ flex: 1 }} />
      <div className="buttons">
        <button onClick={removeBlocks}>
          <Trash color="red" />
        </button>
        <button onClick={generateAlloy}>
          <Code color="blue"></Code>
        </button>
        <button onClick={runModel} disabled={isRunning}>
          <SquarePlay color="green" />
        </button>
      </div>
    </div>
  );
}
