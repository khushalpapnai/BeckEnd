import React, { useState, useContext } from "react";

import Card from "../../../shared/components/Card/Card";
import Input from "../../../shared/components/FormElements/input/Input";
import Button from "../../../shared/components/FormElements/Button/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/util/validators";
import { useForm } from "../../../shared/hooks/form-hook";
import "./auth.css";
import { auth_context } from "../../../shared/context/auth_context";
import { Httprequest } from "../../../shared/hooks/Http-hook";
import ErrorModal from "../../../shared/components/loading/ErrorModal";
import LoadingSpinner from "../../../shared/components/loading/LoadingSpinner";
import ImageUpload from "../../../shared/components/FormElements/imagehandler/ImageUpload";

const Auth = () => {
  const auth = useContext(auth_context);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, request, clearError } = Httprequest();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
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
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await request(
          process.env.REACT_APP_BECKEND_URL + "/api/user/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        auth.LOGIN(responseData.userId, responseData.token);
      } catch (err) {}
    } else {
      try {
        const Formdata = new FormData();
        Formdata.append("email", formState.inputs.email.value);
        Formdata.append("name", formState.inputs.name.value);
        Formdata.append("password", formState.inputs.password.value);
        Formdata.append("image", formState.inputs.image.value);

        const responseData = await request(
          process.env.REACT_APP_BECKEND_URL + "/api/user/singup",
          "POST",
          Formdata
        );

        auth.LOGIN(responseData.userId, responseData.token);
      } catch (err) {}
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              OnInput={inputHandler}
            />
          )}
          {!isLoginMode && (
            <ImageUpload center id="image" OnInput={inputHandler} />
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            OnInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(8)]}
            errorText="Please enter a valid password, at least 8 characters."
            OnInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
