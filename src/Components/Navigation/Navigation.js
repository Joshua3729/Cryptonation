import React from "react";
import classes from "./Navigation.module.css";

const Navigation = () => {
  return (
    <div className={classes.Navigation}>
      <div className={classes.logo}>CRYPTONATION</div>
      <ul className={classes.nav_list}>
        <li className={classes.nav_list_item}>Support</li>
        <li className={classes.nav_list_item}>About</li>
        <li className={classes.nav_list_item}>Sign in</li>
      </ul>
    </div>
  );
};

export default Navigation;
