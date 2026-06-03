import { useEffect, useRef } from "react";
import * as Blockly from "blockly";

export default function BlocklyEditor() {
  const blocklyDiv = useRef(null);
  const workspaceRef = useRef(null);

  useEffect(() => {
    if (workspaceRef.current) return; 

    workspaceRef.current = Blockly.inject(blocklyDiv.current, {
      toolbox: `
        <xml>
          <block type="controls_if"></block>
          <block type="math_number"></block>
        </xml>
      `,
    });

    return () => {
      workspaceRef.current?.dispose();
      workspaceRef.current = null;
    };
  }, []);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div ref={blocklyDiv} style={{ flex: 1 }} />
    </div>
  );
}
