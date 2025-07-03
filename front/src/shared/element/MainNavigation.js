import React from "react";
import { useState } from "react";

import { Link } from "react-router-dom";
import SideDrawer from "./SideDrawer";
import MainHeader from "./MainHeader";
import Backdrop from "../components/Backdrop/Backdrop";
import "./MainNavigation.css";
import Nevlinks from "./NevLinks";

const MainNavigation = (props) => {
  const [drawerisopen, setdrawerisopen] = useState(false);
  const opendrawerHandler = () => {
    setdrawerisopen(true);
  };
  const clossdrawerHandler = () => {
    setdrawerisopen(false);
  };
  return (
    <React.Fragment>
      {drawerisopen && <Backdrop onClick={clossdrawerHandler} />}

      <SideDrawer show={drawerisopen} onClick={clossdrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <Nevlinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={opendrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">YourPlaces</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <Nevlinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
