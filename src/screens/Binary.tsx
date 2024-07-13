import React, { useState } from "react";
import classes from "./Binary.module.css";
import BinaryTreeForms from "../components/forms/BinaryTreeForms/BinaryTreeForms";
import { motion } from "framer-motion";

interface TreeNode {
  id: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

const insertNode = (root: TreeNode | null, id: number): TreeNode => {
  if (root === null) {
    return { id, left: null, right: null };
  }
  if (Math.random() < 0.5) {
    root.left = insertNode(root.left, id);
  } else {
    root.right = insertNode(root.right, id);
  }
  return root;
};

const generateRandomBinaryTree = (n: number): TreeNode | null => {
  if (n <= 0) return null;

  let root: TreeNode | null = null;
  for (let i = 0; i < n; i++) {
    const randomId = Math.floor(Math.random() * 1000000);
    root = insertNode(root, randomId);
  }
  return root;
};

const binaryTreeToVisual = (
  root: TreeNode | null,
  prefix: string = "",
  isLeft: boolean = true,
  visual: string[] = []
): void => {
  if (root === null) return;

  visual.push(prefix + (isLeft ? "└── " : "├── ") + root.id);
  const newPrefix = prefix + (isLeft ? "    " : "│   ");
  if (root.left || root.right) {
    if (root.right) binaryTreeToVisual(root.right, newPrefix, false, visual);
    if (root.left) binaryTreeToVisual(root.left, newPrefix, true, visual);
  }
};

const BinaryTreeGenerator: React.FC = () => {
  const [numNodes, setNumNodes] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const handleSubmit = (): void => {
    if (numNodes <= 0) {
      setError("Please enter a valid number of nodes.");
      return;
    }

    setError("");

    const treeData = generateRandomBinaryTree(numNodes);

    const visual: string[] = [];
    binaryTreeToVisual(treeData, "", true, visual);

    const text = visual.join("\n");

    const blob = new Blob([text], { type: "text/plain" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "binary_tree.txt";
    link.click();
  };

  const textHeader = ["Generate", "Your", "Tree"];

  return (
    <>
      <h1 className={classes.header}>
        {textHeader.map((el, i) => (
          <motion.span
            className={classes.headerText}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.25,
              delay: i / 4,
            }}
            key={i}
          >
            {el}
          </motion.span>
        ))}
      </h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ transition: "smooth", duration: 2 }}
        className={classes.integerContainer}
      >
        <div className={classes.inputContainer}>
          <BinaryTreeForms
            numNodes={numNodes}
            setNumNodes={setNumNodes}
            handleSubmit={handleSubmit}
          />
          {error && <p className={classes.errorMessage}>{error}</p>}
        </div>
      </motion.div>
    </>
  );
};

export default BinaryTreeGenerator;
