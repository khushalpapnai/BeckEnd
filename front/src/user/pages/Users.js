import React, { useEffect, useState } from "react";
import Userlist from "../components/userlist";
import ErrorModal from "../../shared/components/loading/ErrorModal";
import LoadingSpinner from "../../shared/components/loading/LoadingSpinner";
import { Httprequest } from "../../shared/hooks/Http-hook";

const Users = () => {
  const { isLoading, error, request, clearError } = Httprequest();
  const [loadedUsers, setLoadedUsers] = useState();
  useEffect(() => {
    const fetchusers = async () => {
      try {
        const responseData = await request(
          process.env.REACT_APP_BECKEND_URL + "/api/user/"
        );

        setLoadedUsers(responseData.users);
      } catch (err) {}
    };
    fetchusers();
  }, [request]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <Userlist items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
