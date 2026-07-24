

export default function CodeView({ alloyCode }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#0f172a",
        border: "2px solid #ccc",
        color: "white"
      }}
    >
      {alloyCode && (
        <div className="code">
          <h2>Alloy Code</h2>
          <pre>{alloyCode}</pre>
        </div>
      )}
    </div>
  );
}
