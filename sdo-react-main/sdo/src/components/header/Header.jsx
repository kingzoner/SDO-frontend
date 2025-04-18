import "./style.css";
import logo from "../../img/logo.svg";
import React, { useState, useEffect } from "react";
import Bread from "../BreadCrumbs";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

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
    transition: 0.3s;
  }

  .header__nav-lr:hover {
    color: #fff;
    background-color: #dde5f9;
  }
`;

const ButtonEx = styled.button`
  margin-right: 40px;
  color: #415588;
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
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    color: #fff;
    background-color: #dde5f9;
  }
`;

const Header = ({ setIsLoggedIn, isLoggedIn }) => {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("status");
    setUserRole(role);
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("status");
    setIsLoggedIn(false);
    navigate("/");
  };

  const getLaboratoryRoute = () => {
    const role = localStorage.getItem("status"); // берём реальное значение из localStorage прямо сейчас
    return role === "student" ? "/StudLaboratory" : "/laboratory";
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
            {isLoggedIn ? (
              <>
                <Link to={getLaboratoryRoute()} className="header__nav-lr">
                  Лабораторные работы
                </Link>

                <ButtonEx onClick={handleLogout}>
                  Выйти
                </ButtonEx>
              </>
            ) : (
              <Link to="/login" className="header__nav-lr">
                Войти
              </Link>
            )}
          </Nav>
        </HeaderWrapper>
      </HeaderStyle>
      <Bread />
    </>
  );
};

export default Header;
