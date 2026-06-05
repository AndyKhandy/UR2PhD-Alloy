import { useEffect, useRef } from "react";
import * as Blockly from "blockly";
import "../blockly/blocks/index"
import { toolbox } from "../blockly/toolbox";


export default function BlocklyEditor() {
  const blocklyDiv = useRef(null);
  const workspaceRef = useRef(null);

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
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div ref={blocklyDiv} style={{ flex: 1 }} />
      <button onClick={removeBlock}>Remove Blocks</button>
    </div>
  );
}
