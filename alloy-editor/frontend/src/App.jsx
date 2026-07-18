import BlocklyEditor from "./components/BlocklyEditor";
import GraphPlane from "./components/GraphPlane";
import "./styles/App.css";
import { useState } from "react";

function App() {
  const [isEditor, setIsEditor] = useState(true);

  const changeMode = () => {
    setIsEditor(!isEditor);
  };

  return (
    <>
      <div className="header">
        <h1>AlloyLab</h1>
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
        <BlocklyEditor></BlocklyEditor>
      ) : (
        <div className="graphContainer">
          <GraphPlane></GraphPlane>
        </div>
      )}
    </>
  );
}

export default App;
