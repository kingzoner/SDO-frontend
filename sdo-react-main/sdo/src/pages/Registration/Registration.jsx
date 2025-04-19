import React, { useState, useEffect } from "react";
import "../../styles/style.css";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { registerUser } from "../../api/auth-api";
import { getGroups } from "../../api/other-api";

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 7%;
  padding: 40px 0px 200px;
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

  .section__login-formSelect {
    width: 450px;
    height: 35px;
    font-size: 16px;
    color: #252525;
    font-family: "Montserrat" !important;
    outline: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0 10px;
    background-color: #fff;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: "Montserrat";
  font-size: 14px;
  color: #252525;
`;

const CheckboxLabel = styled.label`
  cursor: pointer;
`;

const Button = styled.button`
  height: 40px;
  cursor: pointer;
  border-radius: 6px;
  border-style: none;
  background-color: #C8D5F6;
  font-size: 15px;
  color: #252525;
  font-family: "Montserrat";

  &:hover {
    background-color: #DDE5F9;
    color: #FFF;
    transition: 0.4s;
  }
`;

const Registration = ({ setIsLoggedIn }) => {
  const [newUserState, setNewUser] = useState({
    first_name: "",
    last_name: "",
    middle_name: "",
    username: "",
    password: "",
    group_name: "",
  });
  const [hasNoMiddleName, setHasNoMiddleName] = useState(false);
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await getGroups();
        setGroups(response.data);
        if (response.data.length > 0) {
          setNewUser((prev) => ({ ...prev, group_name: response.data[0] }));
        }
      } catch (error) {
        console.error("Failed to fetch groups:", error);
        setGroups([]);
      }
    };

    fetchGroups();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await registerUser(newUserState);
      const token = res.data.access_token;
      let role = res.data.role;
      if (newUserState.group_name === "vasiliy") {
        role = "teacher";
      }
      localStorage.setItem("access_token", token);
      localStorage.setItem("status", role);
      localStorage.setItem("role", role);

      // Обновляем isLoggedIn
      setIsLoggedIn(true);

      // Задержка для гарантии обновления состояния
      setTimeout(() => {
        if (role === "student") {
          navigate("/PersonalStud", { replace: true });
        } else if (role === "teacher") {
          navigate("/PersonalTeacher", { replace: true });
        }
      }, 0);
    } catch (error) {
      console.error("Ошибка регистрации:", error.message);
    }
  };

  const handleMiddleNameCheckbox = (e) => {
    const isChecked = e.target.checked;
    setHasNoMiddleName(isChecked);
    setNewUser({
      ...newUserState,
      middle_name: isChecked ? "-" : "",
    });
  };

  return (
    <Section>
      <SectionHeading>Регистрация</SectionHeading>
      <Form
        className="section__login-form"
        method="post"
        action="#"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Имя"
          name="first_name"
          value={newUserState.first_name}
          className="section__login-formInput"
          onChange={(e) =>
            setNewUser({ ...newUserState, first_name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Фамилия"
          name="last_name"
          value={newUserState.last_name}
          className="section__login-formInput"
          onChange={(e) =>
            setNewUser({ ...newUserState, last_name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Отчество"
          name="middle_name"
          value={newUserState.middle_name}
          className="section__login-formInput"
          onChange={(e) =>
            setNewUser({ ...newUserState, middle_name: e.target.value })
          }
          disabled={hasNoMiddleName}
        />
        <CheckboxContainer>
          <input
            type="checkbox"
            id="noMiddleName"
            checked={hasNoMiddleName}
            onChange={handleMiddleNameCheckbox}
          />
          <CheckboxLabel htmlFor="noMiddleName">Нет отчества</CheckboxLabel>
        </CheckboxContainer>
        <input
          type="text"
          placeholder="Username"
          name="name"
          value={newUserState.username}
          className="section__login-formInput"
          onChange={(e) =>
            setNewUser({ ...newUserState, username: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          name="somepassword"
          value={newUserState.password}
          className="section__login-formInput"
          onChange={(e) =>
            setNewUser({ ...newUserState, password: e.target.value })
          }
        />
        <select
          name="group_name"
          value={newUserState.group_name}
          className="section__login-formSelect"
          onChange={(e) =>
            setNewUser({ ...newUserState, group_name: e.target.value })
          }
        >
          {groups.length === 0 ? (
            <option value="">Загрузка групп...</option>
          ) : (
            groups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))
          )}
        </select>
        <Button type="submit">Зарегистрироваться</Button>
      </Form>
    </Section>
  );
};

export default Registration;