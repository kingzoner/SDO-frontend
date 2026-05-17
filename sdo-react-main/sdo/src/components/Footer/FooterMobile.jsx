import "./style.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";


const FooterStyle = styled.footer`
    position: fixed;
    margin-top: 20px;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 82px;
    background-color: #DDE5F8;
    display: none;
    z-index: 1000;
    text-align: center;

    @media (max-width: 480px) {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }

    .navBtn {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        color: black;
        width: 50%;
        font-family: "Montserrat";
        font-size: 10px;
    }

    .navBtn img {
        width: 24px;
        height: 24px;
        margin-bottom: 4px;
    }
`;


const FooterMobile = ({ setIsLoggedIn, isLoggedIn }) => {
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem("status");
        setUserRole(role);
    }, [isLoggedIn]);

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
            {isLoggedIn && (
                <FooterStyle>
                    <Link to={getLaboratoryRoute()} className="navBtn">
                        <img alt="" />
                        <span>Лабораторные работы</span>
                    </Link>
                    <Link to="/LaboratoryAdd" className="navBtn">
                        <img alt="" />
                        <span>Добавить лабораторную</span>
                    </Link>
                    <Link to={getPersonalAccount()} className="navBtn">
                        <img alt = ""/>
                        <span>Личный кабинет</span>
                    </Link>
                </FooterStyle>
            )}
        </>
    );
};

export default FooterMobile;