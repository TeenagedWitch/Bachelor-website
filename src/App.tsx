import React from "react";
import classes from "./App.module.css";
import ReusableButton from "./components/button/ReusableButton";
import { motion } from "framer-motion";

const App: React.FC = () => {
  const headerText = ["Generate", "Your", "Data!"];

  return (
    <>
      <div className={classes.header}>
        {headerText.map((el, i) => (
          <motion.span
            className={classes.headerText}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.55,
              delay: i / 4,
            }}
            key={i}
          >
            {<h1>{el}</h1>}
          </motion.span>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ transition: "smooth", duration: 3 }}
        className={classes.buttonContaienr}
      >
        <ReusableButton path={"integers"} name={"NumericGenerator"} />
        <ReusableButton path={"acyclic"} name={"Directed acyclic graph"} />
        <ReusableButton path={"binary"} name={"Binary tree"} />
        <ReusableButton path={"sequences"} name={"Sequences"} />
      </motion.div>
    </>
  );
};

export default App;
