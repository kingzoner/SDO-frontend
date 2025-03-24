import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavContainer = styled.div`
  background-color: #E6F4CF;
  padding: 20px;
  display: flex;
  justify-content: center;
  gap: 300px;
  max-width: 100%;
  border-radius: 8px;
`;

const NavButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #fff;
  color: #000;
  font-size: 16px;
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
`;

const NavigationButtons = () => {
    return (
      <NavContainer>
        {/* Ссылка на главную страницу */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <NavButton>Перейти на главную страницу</NavButton>
        </Link>
  
        {/* Ссылка на страницу с лабораторной, исправить когда будет соединено с бэком*/}
        <Link to="/StudLaboratory" style={{ textDecoration: 'none' }}> 
          <NavButton>Назад к лабораторной</NavButton>
        </Link>
      </NavContainer>
    );
  };

export default NavigationButtons;
