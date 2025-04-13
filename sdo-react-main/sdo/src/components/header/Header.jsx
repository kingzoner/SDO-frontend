import "./style.css";
import logo from "../../img/logo.svg";
import React, { useState, useEffect } from "react";
import Bread from "../BreadCrumbs";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
    border: none;

    .header__nav-lr:hover {
    color: #fff;
    background-color: #dde5f9;
    transition: 0.3s;
  }
`;

const Header = ({ setIsLoggedIn, isLoggedIn, isButtonClicked }) => {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("status");
    setUserRole(role);
    console.log("Updated role:", role);
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("status");

    // Обновляем состояние
    setIsLoggedIn(false);

    // Перенаправляем на главную
    navigate("/");
  };

  const personalCabinetRoute = userRole === "student" ? "/PersonalStud" : "/PersonalTeacher";
  const laboratoryRoute = userRole === "student" ? "/StudLaboratory" : "/laboratory";

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
            {/* Dynamically set the laboratory route based on user role */}
            <Link to={laboratoryRoute} className="header__nav-lr">
              Лабораторные работы
            </Link>
            {/* Dynamically set the personal cabinet route based on user role */}
            <Link to={personalCabinetRoute} className="header__nav-lr">
              Личный кабинет
            </Link>

            {isLoggedIn && (
            <ButtonEx onClick={handleLogout} className="header__nav-lr">
              Выйти
            </ButtonEx>
            )}
          </Nav>
        </HeaderWrapper>
      </HeaderStyle>
      <Bread />
    </>
  );
};

export default Header;