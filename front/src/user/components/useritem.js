import React from "react";
import "./useritem.css";
import "../../shared/components/Avatar/Avatar";
import Avatar from "../../shared/components/Avatar/Avatar";
import { Link } from "react-router-dom";
import Card from "../../shared/components/Card/Card";

const useritem = (props) => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${props.id}/places`}>
          <div className="user-item__image">
            <Avatar
              image={process.env.REACT_APP_BECKEND_URL + `/${props.image}`}
              alt={props.name}
            />
          </div>

          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>
              {props.placecounter}
              {props.placecounter === 1 ? "place" : "places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default useritem;
