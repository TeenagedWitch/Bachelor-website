import React, { useState } from "react";
import classes from "./Dag.module.css";
import { Link } from "react-router-dom";

const DAGGenerator: React.FC = () => {
  const [spikes, setSpikes] = useState<number>(0);
  const [chestnuts, setChestnuts] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const generateDAG = (): string => {
    const nodes: { id: string; label: string; dependencies: string[] }[] = [];

    for (let i = 1; i <= spikes; i++) {
      nodes.push({ id: `Spike_${i}`, label: `Spike ${i}`, dependencies: [] });
    }

    for (let i = 1; i <= chestnuts; i++) {
      const chestnutId = `Chestnut_${i}`;
      const dependency = `Spike_${Math.floor(Math.random() * spikes) + 1}`;
      nodes.push({
        id: chestnutId,
        label: `Chestnut ${i}`,
        dependencies: [dependency],
      });
    }

    const dagData = {
      nodes,
    };

    return JSON.stringify(dagData, null, 2);
  };

  const handleSubmit = (): void => {
    if (spikes <= 0 || chestnuts <= 0) {
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
            value={spikes}
            onChange={(e) => setSpikes(parseInt(e.target.value))}
            className={`${classes.inputField} ${
              error && spikes <= 0 && classes.inputError
            }`}
          />
        </label>
        <label>
          Number of edges:
          <br />
          <input
            type="number"
            value={chestnuts}
            onChange={(e) => setChestnuts(parseInt(e.target.value))}
            className={`${classes.inputField} ${
              error && chestnuts <= 0 && classes.inputError
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
