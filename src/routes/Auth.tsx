import NavIcon from "components/common/NavIcon";
import { authService } from "fbase";
import styled from "styled-components";

import iconTypes from "constants/iconTypes";
import React, { useState } from "react";
import { withRouter, RouteComponentProps } from "react-router";

const AuthContainer = styled.div``;

const ErrorMessage = styled.span`
  color: crimson;
`;

function Auth(props: RouteComponentProps) {
  const { history } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await authService.createUserWithEmailAndPassword(email, password);
      history.push("/");
    } catch (error) {
      setErrMessage(error.message);
    }
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value, name } = e.target as HTMLInputElement;

    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
    }
  };

  return (
    <AuthContainer>
      <NavIcon iconType={iconTypes.HOME} to="/" />
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={onChange}
        />
        <input type="submit" value="Sign Up" />
      </form>
      <ErrorMessage>{errMessage}</ErrorMessage>
    </AuthContainer>
  );
}

export default withRouter(Auth);
