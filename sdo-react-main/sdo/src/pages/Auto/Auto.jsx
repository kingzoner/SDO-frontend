import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getUserStatus } from "../../api/user-api";
import { loginUser } from "../../api/auth-api";

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 7%;
  padding: 40px 0px 245px;
`;

const SectionHeading = styled.h1`
  text-align: center;
  font-size: 29px;
  line-height: 35px;
  color: #252525;
  font-family: "Montserrat";
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 2%;

  .section__login-formInput {
    width: 450px;
    height: 35px;
    font-size: 16px;
    color: #252525;
    font-family: "Montserrat";
    outline: none;
  }
`;

const ButtonsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 458px;
`;

const Button = styled.button`
  height: 40px;
  width: 100%;
  cursor: pointer;
  border-radius: 6px;
  border-style: none;
  background-color: #c8d5f6;
  font-size: 15px;
  color: #252525;
  font-family: "Montserrat";

  &:hover {
    background-color: #dde5f9;
    color: #fff;
    transition: 0.4s;
  }
`;

const Auto = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSuccessfulLogin = () => {
    getUserStatus()
      .then((res) => {
        if (res.data.status === "teacher") {
          navigate("/PersonalTeacher");
        } else if (res.data.status === "student") {
          navigate("/PersonalStud");
        } else {
          throw new Error("Неизвестный статус пользователя");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser(username, password)
      .then((res) => {
        localStorage.setItem("access_token", res.data.access_token);
        setPassword("");
        setError("");
        handleSuccessfulLogin();
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <>
      <Section>
        <SectionHeading>Войдите в личный кабинет</SectionHeading>
        <Form onSubmit={handleSubmit} method="post">
          <input
            type="text"
            placeholder="Ваше имя"
            onChange={handleUsernameChange}
            name="username"
            className="section__login-formInput"
          />
          <input
            type="password"
            placeholder="Пароль"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="section__login-formInput"
          />

          <ButtonsGroup>
            <Button type="submit" className="section__login-button">
              Войти
            </Button>

            <Button type="button" onClick={() => navigate("/registration")}>
              Регистрация
            </Button>
          </ButtonsGroup>
        </Form>

        {error && <SectionHeading>{error}</SectionHeading>}
      </Section>
    </>
  );
};

export default Auto;
