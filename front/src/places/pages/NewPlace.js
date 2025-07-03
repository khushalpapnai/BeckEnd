import React, { useContext } from "react";

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Input from "../../shared/components/FormElements/input/Input";

import Button from "../../shared/components/FormElements/Button/Button";
import "./plaeform.css";
import { useForm } from "../../shared/hooks/form-hook";
import { Httprequest } from "../../shared/hooks/Http-hook";
import { auth_context } from "../../shared/context/auth_context";
//............................................................................//
import ErrorModal from "../../shared/components/loading/ErrorModal";
import LoadingSpinner from "../../shared/components/loading/LoadingSpinner";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
//...........................................................................//
import ImageUpload from "../../shared/components/FormElements/imagehandler/ImageUpload";
const NewPlace = () => {
  const auth = useContext(auth_context);
  const { isLoading, error, request, clearError } = Httprequest();

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );
  const history = useHistory();
  const placeSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("image", formState.inputs.image.value);

      await request(
        process.env.REACT_APP_BECKEND_URL + "/api/places/",
        "POST",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      history.push("/");
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <ImageUpload
          id="image"
          center
          OnInput={inputHandler}
          errorText="please provide image"
        />
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          OnInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          OnInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          OnInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
