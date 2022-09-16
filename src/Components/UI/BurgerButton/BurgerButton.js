import React from "react";
import classes from "./BurgerButton.module.css";

const BurgerButton = () => {
  return (
    <div className={classes.BurgerButton}>
      <div className={classes.bar}></div>
      <div className={classes.bar}></div>
      <div className={classes.bar}></div>
    </div>
  );
};

export default BurgerButton;
