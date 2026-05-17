// src/pages/Disciplines.jsx
import React, { useState } from "react";
import styled from "styled-components";
import DisciplineWindow from "./components/DisciplineWindow";
import { FaSearch } from "react-icons/fa";

const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
  box-sizing: border-box;
`;

const DisciplinesContainer = styled.div`
  display: grid;
  margin: auto;
  width: 80%;
  grid-template-columns: 1fr;
  gap: 30px;

  @media (max-width: 480px) {
    width: 90%;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
`;

const SearchInput = styled.input`
  padding: 0;
  width: 100%;
  font-family: "Montserrat";
  height: 47px;
  box-sizing: border-box;
  background-color: #f0f0f0;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: 16px;
  color: #000;
  text-align: center;

  &:focus {
    outline: none;
  }
`;

const SearchInputContainer = styled.div`
  position: relative;
  width: 80%;
  max-width: 500px;
  margin-bottom: 30px;
  box-sizing: border-box;

  @media (max-width: 480px) {
    width: 90%;
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #000;
`;

const Disciplines = () => {
  const disciplinesList = [
    "Базы данных",
    "Алгоритмы и структуры данных",
    "Программирование на JavaScript",
    "Операционные системы",
    "Компьютерные сети",
    "Математический анализ",
    "Дискретная математика",
  ];

  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredSubjects = disciplinesList.filter((discipline) =>
    discipline.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <PageWrapper>
      <SearchInputContainer>
        <SearchInput
          type="text"
          placeholder="Поиск дисциплины"
          value={searchValue}
          onChange={handleSearchChange}
        />
        <SearchIcon />
      </SearchInputContainer>

      <DisciplinesContainer>
        {filteredSubjects.length > 0 ? (
          filteredSubjects.map((discipline, index) => (
            <DisciplineWindow key={index} disciplineName={discipline} />
          ))
        ) : (
          <p>Дисциплины не найдены</p>
        )}
      </DisciplinesContainer>
    </PageWrapper>
  );
};

export default Disciplines;