// src/pages/Disciplines.jsx
import React from "react";
import styled from "styled-components";
import DisciplineWindow from "./components/DisciplineWindow";

const DisciplinesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const Disciplines = () => {
  // Список дисциплин
  const disciplinesList = [
    "Базы данных",
    "Алгоритмы и структуры данных",
    "Программирование на JavaScript",
    "Операционные системы",
    "Компьютерные сети",
    "Математический анализ",
    "Дискретная математика",
  ];

  return (
    <DisciplinesContainer>
      {disciplinesList.map((discipline, index) => (
        <DisciplineWindow key={index} disciplineName={discipline} />
      ))}
    </DisciplinesContainer>
  );
};

export default Disciplines;
