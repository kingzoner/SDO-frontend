import "./style.css";
import logo from "../../img/logo.svg";
import React, { useState, useEffect } from "react";
import Bread from "../BreadCrumbs";
import { Link } from "react-router-dom";
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
  // State to store the user's role
  const [userRole, setUserRole] = useState(null);

  // Fetch user role from localStorage when the component mounts or when isLoggedIn changes
  useEffect(() => {
    const role = localStorage.getItem("status"); // Fetch the role from localStorage
    setUserRole(role); // Update the userRole state
    console.log("Updated role:", role); // Log the role for debugging
  }, [isLoggedIn]); // Add isLoggedIn as a dependency to re-run the effect when it changes

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("status"); // Clear the role from localStorage on logout
  };

  // Determine the correct routes based on the user's role
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

            {isLoggedIn && <ButtonEx onClick={handleLogout}>Выйти</ButtonEx>}
          </Nav>
        </HeaderWrapper>
      </HeaderStyle>
      <Bread />
    </>
  );
};

export default Header;