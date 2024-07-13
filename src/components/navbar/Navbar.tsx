import React, { useState } from "react";
import { motion } from "framer-motion";
import classes from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const navListVariants = {
    hidden: {
      opacity: 0,
      x: -520,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
      },
    },
    exit: {
      opacity: 0,
      x: -520,
      transition: {
        duration: 0.7,
      },
    },
  };

  return (
    <nav className={classes.navbar}>
      <h1>
        <Link to="/">NDBS Gen</Link>
      </h1>
      <motion.div
        className={`${classes.navList} ${showMenu ? classes.show : ""}`}
        variants={navListVariants}
        initial="hidden"
        animate={showMenu ? "visible" : "hidden"}
        exit="exit"
      >
        <ul>
          <li>
            <Link to="/contact" onClick={toggleMenu}>
              Contact Us
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={toggleMenu}>
              About us
            </Link>
          </li>
          <li>
            <Link to="" onClick={toggleMenu}>
              Suggestions
            </Link>
          </li>
        </ul>
      </motion.div>
      <div className={classes.navbarSecondary}>
        <ul>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/about">About us</Link>
          </li>
          <li>
            <Link to="/suggest">Suggestions</Link>
          </li>
        </ul>
      </div>
      <div className={classes.burgerMenu} onClick={toggleMenu}>
        <div
          className={`${classes.line} ${showMenu ? classes.lineOpen : ""}`}
        ></div>
        <div
          className={`${classes.line} ${showMenu ? classes.lineOpen : ""}`}
        ></div>
        <div
          className={`${classes.line} ${showMenu ? classes.lineOpen : ""}`}
        ></div>
      </div>
    </nav>
  );
};

export default Navbar;
