import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/placelist";
import { Httprequest } from "../../shared/hooks/Http-hook";
import ErrorModal from "../../shared/components/loading/ErrorModal";
import LoadingSpinner from "../../shared/components/loading/LoadingSpinner";
const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, request, clearError } = Httprequest();

  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await request(
          process.env.REACT_APP_BECKEND_URL + `/api/places/user/${userId}`
        );
        setLoadedPlaces(responseData.userplaces);
      } catch (err) {}
    };
    fetchPlaces();
  }, [request, userId]);
  const deletedplacehandler = (deletedplaceId) => {
    setLoadedPlaces((prevPlace) =>
      prevPlace.filter((place) => place.id !== deletedplaceId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={deletedplacehandler} />
      )}
    </React.Fragment>
  );
};

export default UserPlaces;
