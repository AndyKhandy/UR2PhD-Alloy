import { useEffect, useRef, useState } from "react";
import * as Blockly from "blockly";
import "../blockly/blocks/index";
import "../blockly/generators/indexG"
import { toolbox } from "../blockly/toolbox";
import { alloyGenerator } from "../blockly/generators/alloy_generator";

export default function BlocklyEditor() {
  const blocklyDiv = useRef(null);
  const workspaceRef = useRef(null);
  const [alloyCode, setAlloyCode] = useState("");

  useEffect(() => {
    if (workspaceRef.current) return;

    workspaceRef.current = Blockly.inject(blocklyDiv.current, { toolbox });

    return () => {
      workspaceRef.current?.dispose();
      workspaceRef.current = null;
    };
  }, []);

  const removeBlock = () => {
    workspaceRef.current.clear();
    setAlloyCode("");
  };

  function generateAlloy() {
    const code = alloyGenerator.workspaceToCode(workspaceRef.current);

    setAlloyCode(code);
  }

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div ref={blocklyDiv} style={{ flex: 1 }} />
      <div className="buttons">
        <button onClick={removeBlock}>Remove Blocks</button>
        <button onClick={generateAlloy}>Generate Alloy</button>
      </div>
      <pre>{alloyCode}</pre>
    </div>
  );
}
