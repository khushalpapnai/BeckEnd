import React from "react";
import "./userlist.css";
import Useritem from "./useritem";
import Card from "../../shared/components/Card/Card";

const userlist = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>no user found!</h2>
        </Card>
      </div>
    );
  }
  return (
    <ul className="users-list">
      {props.items.map((user) => (
        <Useritem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placecounter={user.place.length}
        />
      ))}
    </ul>
  );
};

export default userlist;
