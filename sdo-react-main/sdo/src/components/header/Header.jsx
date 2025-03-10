import "./style.css";
import logo from "../../img/logo.svg";
import React from "react";
import Bread from "../BreadCrumbs";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
// import { LABORATORY_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE , STUDLABORATORY_ROUTE } from '../../app/routing/route';

const HeaderStyle = styled.header`
  width: 100%;
  height: 100%;
  background-color: #c8d5f6;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0px 0px 60px;
`;

const Nav = styled.nav`
  padding: 20px 0px 30px 0px;
  display: flex;
  justify-content: flex-end;

  .header__nav-lr {
    margin-right: 40px;
    color: #415588;
    text-decoration: none;
    font-size: 16px;
    font-family: "Montserrat";
    line-height: 27px;
    background-color: #fff;
    width: 232px;
    height: 36px;
    border-radius: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .header__nav-lr:hover {
    color: #fff;
    background-color: #dde5f9;
    transition: 0.3s;
  }
`;

const ButtonEx = styled.button`
  margin-right: 40px;
  color: #c8d5f6;
  text-decoration: none;
  font-size: 16px;
  font-family: "Montserrat";
  line-height: 27px;
  background-color: #fff;
  width: 232px;
  height: 36px;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = ({ setIsLoggedIn, isLoggedIn, isButtonClicked }) => {
  const getUserFromAuthentication = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8040/login");
      console.log("Информация о пользователе:", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <HeaderStyle>
        <HeaderWrapper>
          <div>
            <Link to="/">
              <img src={logo} alt="логотип" />
            </Link>
          </div>
          <Nav>
            <Link to="/StudLaboratory" className="header__nav-lr">
              Лабораторные работы
            </Link>
            <Link to="/PersonalTeacher" className="header__nav-lr">
              Личный кабинет
            </Link>

            {/*
                            // Сохраняем логику регистрации для дальнейшего использования
                            // Если пользователь НЕ авторизован, тогда отображать кнопку регистрации:
                            // {!isLoggedIn && (
                            //     <Link to="/registration" className="header__nav-lr">
                            //         Регистрация
                            //     </Link>
                            // )}
                        */}

            {isLoggedIn && <ButtonEx onClick={handleLogout}>Выйти</ButtonEx>}
          </Nav>
        </HeaderWrapper>
      </HeaderStyle>
      <Bread />
    </>
  );
};

export default Header;
