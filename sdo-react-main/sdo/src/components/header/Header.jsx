import "./style.css";
import logo from "../../img/logo.svg";
import React, { useState, useEffect } from "react";
import Bread from "../BreadCrumbs";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderStyle = styled.header`
  width: 100%;
  background-color: #c8d5f6;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px 40px 0 60px;

  img {
    display: block;
    height: 56px;
    width: auto;
  }

  /* планшеты / небольшие ноутбуки */
  @media (max-width: 768px) {
    padding: 12px 24px 0 24px;

    img {
      height: 52px;
    }
  }

  /* мобильный вариант до 480px */
  @media (max-width: 480px) {
    padding: 12px 16px 0 16px;

    img {
      height: 48px;
    }
  }
`;

const Nav = styled.nav`
  padding: 20px 0px 30px 0px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

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
    white-space: nowrap;
  }

  .header__nav-lr:hover {
    color: #fff;
    background-color: #dde5f9;
  }

  /* планшеты / небольшие ноутбуки */
  @media (max-width: 768px) {
    padding: 16px 0 20px 0;

    .header__nav-lr {
      margin-right: 24px;
      width: 180px;
      height: 34px;
      font-size: 15px;
    }
  }

  /* мобильный вариант до 480px */
  @media (max-width: 480px) {
    padding: 12px 0 16px 0;

    .header__nav-lr {
      margin-right: 16px;
      width: 140px;
      height: 32px;
      font-size: 14px;
    }
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

  /* планшеты / небольшие ноутбуки */
  @media (max-width: 768px) {
    margin-right: 24px;
    width: 180px;
    height: 34px;
    font-size: 15px;
  }

  /* мобильный вариант до 480px */
  @media (max-width: 480px) {
    margin-right: 16px;
    width: 140px;
    height: 32px;
    font-size: 14px;
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

  const getPersonalAccount = () => {
    const role = localStorage.getItem("status");
    return role === "student" ? "/PersonalStud" : "/PersonalTeacher";
  };

  const getLaboratoryRoute = () => {
    const role = localStorage.getItem("status");
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
                <Link to={getPersonalAccount()} className="header__nav-lr">
                  Личный кабинет
                </Link>

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
