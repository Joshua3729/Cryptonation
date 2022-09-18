import React from "react";
import BurgerButton from "../UI/BurgerButton/BurgerButton";
import classes from "./Navigation.module.css";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className={classes.Navigation}>
      <div className={classes.logo}>
        <Link to="/">CRYPTO-JOINT</Link>
      </div>
      <ul className={classes.nav_list}>
        <li className={classes.nav_list_item}>Support</li>
        <li className={classes.nav_list_item}>About</li>
        <li className={classes.nav_list_item}>Sign in</li>
      </ul>
      <BurgerButton />
    </div>
  );
};

export default Navigation;
