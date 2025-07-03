import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/input/Input";
import Button from "../../shared/components/FormElements/Button/Button";
import Card from "../../shared/components/Card/Card";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";

import { useForm } from "../../shared/hooks/form-hook";
import { Httprequest } from "../../shared/hooks/Http-hook";

import ErrorModal from "../../shared/components/loading/ErrorModal";
import LoadingSpinner from "../../shared/components/loading/LoadingSpinner";

import { auth_context } from "../../shared/context/auth_context";
import "./plaeform.css";
const UpdatePlace = () => {
  const auth = useContext(auth_context);
  const { isLoading, error, request, clearError } = Httprequest();
  const [loadedPlaces, setLoadedPlaces] = useState();
  const placeId = useParams().placeId;

  const history = useHistory();

  const [formState, inputHandler, setformdata] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await request(
          process.env.REACT_APP_BECKEND_URL + `/api/places/${placeId}`
        );

        setLoadedPlaces(responseData.place);
        setformdata(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {
        // Optionally, handle error here
        console.log(err);
      }
    };
    fetchPlaces();
  }, [request, placeId, setformdata]);

  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await request(
        process.env.REACT_APP_BECKEND_URL + `/api/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );

      history.push("/" + auth.userId + "/place");
    } catch (err) {
      // Handle error if needed
      console.log(err);
    }
  };
  if (placeId.creator !== auth.userId) {
    console.log("cant");
  }
  if (isLoading) {
    // If the data is still loading, show a spinner
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  // If after loading there's no place, show a message
  if (!loadedPlaces && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlaces && (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            OnInput={inputHandler}
            initialValue={loadedPlaces.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            OnInput={inputHandler}
            initialValue={loadedPlaces.description}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdatePlace;
