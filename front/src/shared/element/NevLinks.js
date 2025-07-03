import React, { useContext } from "react";
import "./NevLinks.css";
import { NavLink } from "react-router-dom";
import { auth_context } from "../context/auth_context";
import Button from "../components/FormElements/Button/Button";

const NevLinks = (props) => {
  const auth = useContext(auth_context);
  return (
    <ul className="nav-links">
      <li>
        <NavLink to={"/"} exact>
          All User
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/places`}>My Place</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to={"/places/new"}>Add Place</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to={"/auth"}>Authenticate</NavLink>
        </li>
      )}
      {auth.isLoggedIn && <Button onClick={auth.LOGOUT}>LOGOUT</Button>}
    </ul>
  );
};
export default NevLinks;
