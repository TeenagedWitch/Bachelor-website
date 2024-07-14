import React, { useState } from "react";
import classes from "./Dag.module.css";
import { Link } from "react-router-dom";

const DAGGenerator: React.FC = () => {
  const [vertices, setVertices] = useState<number>(0);
  const [edges, setEdges] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const generateDAG = (): string => {
    const nodes: { id: string; label: string; dependencies: string[] }[] = [];
    const edgesSet = new Set<string>();

    for (let i = 1; i <= vertices; i++) {
      nodes.push({ id: `Node_${i}`, label: `Node ${i}`, dependencies: [] });
    }

    let edgeCount = 0;
    for (let i = 2; i <= vertices && edgeCount < edges; i++) {
      const possibleDependencies = Array.from(
        { length: i - 1 },
        (_, k) => k + 1
      );
      const numberOfDependencies = Math.min(
        possibleDependencies.length,
        edges - edgeCount
      );

      for (let j = 0; j < numberOfDependencies; j++) {
        const from =
          possibleDependencies[
            Math.floor(Math.random() * possibleDependencies.length)
          ];
        const edge = `Node_${from}->Node_${i}`;
        if (!edgesSet.has(edge)) {
          nodes[i - 1].dependencies.push(`Node_${from}`);
          edgesSet.add(edge);
          edgeCount++;
          if (edgeCount >= edges) break;
        }
      }
    }

    const dagData = {
      nodes,
    };

    return JSON.stringify(dagData, null, 2);
  };

  const handleSubmit = (): void => {
    if (vertices <= 0 || edges <= 0) {
      setError("Please fill in all fields.");
      return;
    }

    const dagData = generateDAG();
    const blob = new Blob([dagData], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "dag_data.txt";
    link.click();
    setError("");
  };

  return (
    <div className={classes.dag}>
      <div className={classes.dagInputs}>
        <label>
          Number of Vertices:
          <br />
          <input
            type="number"
            value={vertices}
            onChange={(e) => setVertices(parseInt(e.target.value))}
            className={`${classes.inputField} ${
              error && vertices <= 0 && classes.inputError
            }`}
          />
        </label>
        <label>
          Number of edges:
          <br />
          <input
            type="number"
            value={edges}
            onChange={(e) => setEdges(parseInt(e.target.value))}
            className={`${classes.inputField} ${
              error && edges <= 0 && classes.inputError
            }`}
          />
        </label>
      </div>
      {error && <p className={classes.error}>{error}</p>}
      <div className={classes.buttons}>
        <button onClick={handleSubmit}>Generate</button>
        <Link to="/">
          <button>Back</button>
        </Link>
      </div>
    </div>
  );
};

export default DAGGenerator;
