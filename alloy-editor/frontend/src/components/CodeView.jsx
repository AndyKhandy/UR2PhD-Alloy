import "../styles/CodeView.css";
import { useEffect, useRef } from "react";
import { determineFontSize } from "../utils/data";

export default function CodeView({ alloyCode }) {
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current && alloyCode) {
      const newFontSize = determineFontSize(alloyCode);
      codeRef.current.style.setProperty("font-size", `${newFontSize}px`);
    }
  }, [alloyCode]);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        border: "2px solid #ccc",
        color: "white",
      }}
      className="codePane"
    >
      {alloyCode ? (
        <div className="code">
          <pre ref={codeRef}>{alloyCode}</pre>
        </div>
      ) : (
          <h2>
            Add Blocks to the editor to view the textual code here!
          </h2>
      )}
    </div>
  );
}
