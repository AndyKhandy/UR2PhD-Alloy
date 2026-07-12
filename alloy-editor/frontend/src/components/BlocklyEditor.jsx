import { useEffect, useRef, useState } from "react";
import * as Blockly from "blockly";
import "../blockly/blocks/index";
import "../blockly/generators/indexG";
import { toolbox } from "../blockly/toolbox";
import { alloyGenerator } from "../blockly/generators/alloy_generator";
import "../styles/blockly.css"

export default function BlocklyEditor() {
  const blocklyDiv = useRef(null);
  const workspaceRef = useRef(null);
  const [alloyCode, setAlloyCode] = useState("");
  const [runResult, setRunResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [runError, setRunError] = useState(null);

  useEffect(() => {
    if (workspaceRef.current) return;

    workspaceRef.current = Blockly.inject(blocklyDiv.current, {
      renderer: "zelos",
      toolbox,
    });

    return () => {
      workspaceRef.current?.dispose();
      workspaceRef.current = null;
    };
  }, []);

  const removeBlock = () => {
    workspaceRef.current.clear();
    setAlloyCode("");
    setRunResult(null);
    setRunError(null);
  };

  function generateAlloy() {
    const code = alloyGenerator.workspaceToCode(workspaceRef.current);
    setAlloyCode(code);
    setRunResult(null);
    setRunError(null);
  }

  async function runModel() {
    const code = alloyGenerator.workspaceToCode(workspaceRef.current);
    setAlloyCode(code);
    setRunResult(null);
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
      console.log(result);
      setRunResult(result);
    } catch (err) {
      setRunError(err.message);
    } finally {
      setIsRunning(false);
    }
  }

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div ref={blocklyDiv} style={{ flex: 1 }} />
      <div className="buttons">
        <button onClick={removeBlock}>Remove Blocks</button>
        <button onClick={generateAlloy}>Generate Alloy</button>
        <button onClick={runModel} disabled={isRunning}>
          {isRunning ? "Running..." : "Run Model"}
        </button>
      </div>
      <pre>{alloyCode}</pre>
      {runError && (
        <div style={{ color: "red", padding: "8px" }}>Error: {runError}</div>
      )}
      {runResult && (
        <div style={{ padding: "8px", fontFamily: "monospace" }}>
          <strong>
            Status:{" "}
            {runResult.satisfiable ? "SATISFIABLE ✓" : "UNSATISFIABLE ✗"}
          </strong>
          {runResult.satisfiable && (
            <>
              {Object.entries(runResult.atoms).map(([sig, atoms]) => (
                <div key={sig} style={{ marginTop: "4px" }}>
                  <em>{sig}</em>:{" "}
                  {atoms.length > 0 ? atoms.join(", ") : "(empty)"}
                </div>
              ))}
              {runResult.relations.length > 0 && (
                <div style={{ marginTop: "4px" }}>
                  <strong>Relations:</strong>
                  {runResult.relations.map((r, i) => (
                    <div key={i} style={{ marginLeft: "12px" }}>
                      {r.fieldName}: {r.source} → {r.target}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
