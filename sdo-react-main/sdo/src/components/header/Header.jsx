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
  box-sizing: border-box;

  img {
    display: block;
    height: 56px;
    width: auto;
    transition: height 0.3s ease;
  }

  @media (max-width: 1200px) {
    padding: 12px 36px 0 56px;
    img { height: 55px; }
  }

  @media (max-width: 1024px) {
    padding: 12px 30px 0 48px;
    img { height: 52px; }
  }

  @media (max-width: 900px) {
    padding: 12px 24px 0 40px;
    img { height: 50px; }
  }

  @media (max-width: 768px) {
    padding: 12px 20px 0 20px;
    img { height: 48px; }
  }

  @media (max-width: 640px) {
    padding: 10px 16px 0 16px;
    img { height: 44px; }
  }

  @media (max-width: 570px) {
    padding: 10px 14px 0 14px;
    img { height: 42px; }
  }

  @media (max-width: 480px) {
    padding: 8px 12px 0 12px;
    img { height: 38px; }
  }

  @media (max-width: 400px) {
    padding: 8px 10px 0 10px;
    img { height: 36px; }
  }
`;

const Nav = styled.nav`
  padding: 20px 0px 30px 0px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: nowrap;
  gap: 0;
  box-sizing: border-box;
  min-width: 0;

  .header__nav-lr {
    margin-right: 40px;
    color: #415588;
    text-decoration: none;
    font-size: 16px;
    font-family: "Montserrat";
    line-height: 1.5;
    background-color: #fff;
    width: 232px;
    height: 36px;
    border-radius: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
    white-space: nowrap;
    box-sizing: border-box;
    font-weight: 500;
    flex-shrink: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .header__nav-lr:hover {
    color: #fff;
    background-color: #dde5f9;
    transform: translateY(-1px);
  }
  @media (max-width: 2560px) {
    .label-full {
      display: inline;
    }
    .label-short {
      display: none;
    }
  }

  @media (max-width: 1200px) {
    padding: 18px 0 28px 0;
    .header__nav-lr {
      margin-right: 24px;
      width: auto;
      min-width: 0;
      padding: 0 20px;
      height: 36px;
      font-size: 15.5px;
    }
    .label-full {
      display: inline;
    }
    .label-short {
      display: none;
    }
  }

  @media (max-width: 1024px) {
    padding: 16px 0 24px 0;
    .header__nav-lr {
      margin-right: 20px;
      width: auto;
      min-width: 0;
      padding: 0 18px;
      height: 35px;
      font-size: 15px;
    }
    .label-full {
      display: inline;
    }
    .label-short {
      display: none;
    }
  }

  @media (max-width: 900px) {
    padding: 14px 0 22px 0;
    .header__nav-lr {
      margin-right: 16px;
      width: auto;
      min-width: 0;
      padding: 0 16px;
      height: 34px;
      font-size: 14.5px;
    }
    .label-full {
      display: inline;
    }
    .label-short {
      display: none;
    }
  }

  @media (max-width: 768px) {
    padding: 12px 0 18px 0;
    .header__nav-lr {
      margin-right: 12px;
      width: auto;
      min-width: 0;
      padding: 0 14px;
      height: 33px;
      font-size: 13.5px;
    }
    .label-full {
      display: inline;
    }
    .label-short {
      display: none;
    }
  }

  @media (max-width: 640px) {
    padding: 10px 0 16px 0;
    .header__nav-lr {
      margin-right: 10px;
      width: auto;
      min-width: 0;
      padding: 0 12px;
      height: 32px;
      font-size: 13px;
    }
    .label-full {
      display: inline;
    }
    .label-short {
      display: none;
    }
  }

  @media (max-width: 570px) {
    padding: 10px 0 14px 0;
    .header__nav-lr {
      margin-right: 8px;
      width: auto;
      min-width: 0;
      max-width: 90px;
      padding: 0 10px;
      height: 30px;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: inline-flex;
      justify-content: center;
      align-items: center;
    }
    .label-full {
      display: none;
    }
    .label-short {
      display: inline;
    }
  }

  @media (max-width: 480px) {
    padding: 8px 0 12px 0;
    .header__nav-lr {
      margin-right: 6px;
      width: auto;
      min-width: 0;
      max-width: 75px;
      padding: 0 8px;
      height: 28px;
      font-size: 11px;
      border-radius: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      justify-content: center;
      align-items: center;
    }
    .label-full {
      display: none;
    }
    .label-short {
      display: inline;
    }
  }

  @media (max-width: 400px) {
    padding: 8px 0 10px 0;
    .header__nav-lr {
      margin-right: 4px;
      width: auto;
      min-width: 0;
      max-width: 65px;
      padding: 0 6px;
      height: 26px;
      font-size: 10px;
      border-radius: 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      justify-content: center;
      align-items: center;
    }
    .label-full {
      display: none;
    }
    .label-short {
      display: inline;
    }
  }
`;

const ButtonEx = styled.button`
  margin-right: 40px;
  color: #415588;
  font-size: 16px;
  font-family: "Montserrat";
  line-height: 1.5;
  background-color: #fff;
  width: 232px;
  height: 36px;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-sizing: border-box;
  white-space: nowrap;
  font-weight: 500;
  flex-shrink: 0;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    color: #fff;
    background-color: #dde5f9;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 1200px) {
    margin-right: 24px;
    width: auto;
    padding: 0 20px;
    height: 36px;
    font-size: 15.5px;
  }

  @media (max-width: 1024px) {
    margin-right: 20px;
    width: auto;
    padding: 0 18px;
    height: 35px;
    font-size: 15px;
  }

  @media (max-width: 900px) {
    margin-right: 16px;
    width: auto;
    padding: 0 16px;
    height: 34px;
    font-size: 14.5px;
  }

  @media (max-width: 768px) {
    margin-right: 12px;
    width: auto;
    padding: 0 14px;
    height: 33px;
    font-size: 13.5px;
  }

  @media (max-width: 640px) {
    margin-right: 10px;
    width: auto;
    padding: 0 12px;
    height: 32px;
    font-size: 13px;
  }

  @media (max-width: 570px) {
    margin-right: 8px;
    width: auto;
    max-width: 70px;
    padding: 0 10px;
    height: 30px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 480px) {
    margin-right: 6px;
    width: auto;
    max-width: 60px;
    padding: 0 8px;
    height: 28px;
    font-size: 11px;
    border-radius: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 400px) {
    margin-right: 4px;
    width: auto;
    max-width: 55px;
    padding: 0 6px;
    height: 26px;
    font-size: 10px;
    border-radius: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
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
                  <span className="label-full">Личный кабинет</span>
                  <span className="label-short">Лич. кабинет</span>
                </Link>

                <Link to={getLaboratoryRoute()} className="header__nav-lr">
                  <span className="label-full">Лабораторные работы</span>
                  <span className="label-short">Лаб. работы</span>
                </Link>

                <ButtonEx onClick={handleLogout}>
                  Выйти
                </ButtonEx>
              </>
            ) : (
              <Link to="/login" className="header__nav-lr">
                <span className="label-full">Войти</span>
                <span className="label-short">Войти</span>
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
