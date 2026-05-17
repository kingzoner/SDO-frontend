// src/components/DisciplineWindow.jsx
import React from "react";
import styled from "styled-components";

// Аналогичен вашему StyledContainer
const StyledContainer = styled.div`
  box-sizing: border-box;
  background-color: #e6f4cf;
  font-family: "Montserrat";
  width: 100%;
  min-height: 70px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  transition: background-color 0.3s;
  border-radius: 7px;
  @media (max-width: 480px) {
    min-height: 86px;
    min-width: 158px;
  }
`;

const DisciplineContent = styled.div`
  display: flex;
  align-items: center;
`;

const DisciplineName = styled.div`
  font-weight: normal;
  font-size: 20px;
  margin-right: 10px;
  overflow: hidden;
  @media (max-width: 480px) {
    font-size: 16px;
    margin:auto;
  }
`;

const ChooseButton = styled.button`
  font-weight: normal;
  font-size: 20px;
  background-color: #becbee;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  height: 42px;
  padding: 0 15px;

  &:hover {
    background-color: #0056b3;
  }
  @media (max-width: 480px) {
    display: none;
  }
`;

const DisciplineWindow = ({ disciplineName }) => {
  return (
    <StyledContainer>
      <DisciplineContent>
        <DisciplineName>{disciplineName}</DisciplineName>
      </DisciplineContent>
      {/* Можно настроить кнопку под ваши задачи */}
      <ChooseButton>Выбрать</ChooseButton>
    </StyledContainer>
  );
};

export default DisciplineWindow;
