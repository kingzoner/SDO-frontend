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

  /* планшеты и небольшие экраны */
  @media (max-width: 768px) {
    padding: 32px 24px 180px;
    padding-top: 60px;
  }

  /* мобильный макет до 480px */
  @media (max-width: 480px) {
    padding: 32px 16px 140px;
    padding-top: 60px;
  }
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
    max-width: 100%;
    height: 35px;
    font-size: 16px;
    color: #252525;
    font-family: "Montserrat";
    outline: none;
    box-sizing: border-box;
  }

  /* фиксированная / контролируемая ширина формы на средних и малых экранах */
  @media (max-width: 768px) {
    width: 100%;
    max-width: 420px;

    .section__login-formInput {
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    max-width: 360px;
  }
`;

const ButtonsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 458px;
  max-width: 100%;
  margin-top: 8px;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 420px;
  }

  @media (max-width: 480px) {
    max-width: 360px;
  }
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

const Auto = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // const handleSuccessfulLogin = () => {
  //   getUserStatus()
  //     .then((res) => {
  //       if (res.data.status === "teacher") {
  //         navigate("/PersonalTeacher");
  //       } else if (res.data.status === "student") {
  //         navigate("/PersonalStud");
  //       } else {
  //         throw new Error("Неизвестный статус пользователя");
  //       }
  //       localStorage.setItem("status", res.data.status);
  //       // setUserRole
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //     });
  // };

  const handleSuccessfulLogin = () => {
    getUserStatus()
      .then((res) => {
        const status = res.data.status; // teacher или student
  
        localStorage.setItem("status", status);
        localStorage.setItem("role", status);
  
        if (status === "teacher") {
          navigate("/PersonalTeacher");
        } else if (status === "student") {
          navigate("/PersonalStud");
        } else {
          throw new Error("Неизвестный статус пользователя");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser(username, password)
      .then((res) => {
          localStorage.setItem("access_token", res.data.access_token);
          setPassword("");
          setIsLoggedIn(true);
          setError("");
          handleSuccessfulLogin();
      })
      .catch((error) => {
        setError("Неверное имя пользователя или пароль");
      });
  };

  return (
    <Section>
      <SectionHeading>Войдите в личный кабинет</SectionHeading>
      <Form onSubmit={handleSubmit} method="post">
        <input
          type="text"
          placeholder="Ваше имя"
          onChange={(e) => setUsername(e.target.value)}
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
          <Button type="submit">Войти</Button>
          <Button type="button" onClick={() => navigate("/registration")}>
            Регистрация
          </Button>
        </ButtonsGroup>
      </Form>
      {error && <SectionHeading>{error}</SectionHeading>}
    </Section>
  );
};

export default Auto;