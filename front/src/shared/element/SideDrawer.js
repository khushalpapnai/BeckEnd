import React from "react";
import React_Dom from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./SideDrawer.css";
import "../../index.css";

const SideDrawer = (props) => {
  const content = (
    <CSSTransition
      in={props.show}
      timeout={500}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className="side-drawer" onClick={props.onClick}>
        {props.children}
      </aside>
    </CSSTransition>
  );
  return React_Dom.createPortal(
    content,
    document.getElementById("drawer-hook")
  );
};
export default SideDrawer;
