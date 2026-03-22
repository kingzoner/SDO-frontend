import { Link } from "react-router-dom";
import React from "react";
import "./style.css";
import "../CheckLaboratory/style.css";
import styled from "styled-components";
import InputOutputTask from "./components/InputOutputTask.jsx";
import StudentLabs from "./components/StudentLabs.jsx";
import { FaSearch } from "react-icons/fa";

const Container = styled.div`
  padding: 0 200px;
`;

const SearchContainer = styled.div`
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-top: 20px;
`;

const SearchInputContainer = styled.div`
  position: relative;

  width: 395px; // Ширина окна поиска
`;

const SearchInput = styled.input`
  padding: 0; // Убираем отступы

  width: 100%;

  height: 47px; // Высота окна поиска

  box-sizing: border-box;

  background-color: #f0f0f0;

  border: none;

  border-radius: 8px; // Закругленные углы

  outline: none;

  font-size: 16px; // Уменьшаемый размер шрифта

  color: #000; // Цвет текста

  text-align: center; // Центрируем текст

  &:focus {
    outline: none;
  }
`;

const Select = styled.select`
  width: 231px; // Ширина для выпадающих списков

  font-family: "Montserrat";
  height: 47px; // Высота для выпадающих списков

  margin-left: 20px;

  border: none;

  background-color: #f0f0f0;

  padding: 0; // Убираем отступы

  font-size: 16px; // Уменьшаемый размер шрифта

  color: #000; // Цвет текста

  text-align: center; // Центрируем текст

  border-radius: 8px; // Закругленные углы

  &:focus {
    outline: none;
  }
`;

const StudentListTitle = styled.h2`
  margin-top: 15px;
  font-size: 20px;
  font-family: "Montserrat";
  font-weight: normal; // Менее жирный текст
`;

const SearchWrapper = styled.div`
  position: relative;
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;

  right: 15px; // Отступ от правого края

  font-family: "Montserrat";
  top: 50%;

  transform: translateY(-50%);

  color: #000;

  cursor: pointer;
`;

const CheckLaboratory = () => {
  const handleSearch = () => {
    console.log("Поиск запущен!");
  };
  const studentsLabWorks = [
    { name: "Иванов И.И.", labWorks: [{ score: 84, passed: true }] },

    { name: "Петров П.П.", labWorks: [{ score: 75, passed: true }] },

    { name: "Сидоров С.С.", labWorks: [{ score: 50, passed: false }] },
    { name: "Иванов И.И.", labWorks: [{ score: 84, passed: true }] },

    { name: "Петров П.П.", labWorks: [{ score: 75, passed: true }] },

    { name: "Сидоров С.С.", labWorks: [{ score: 50, passed: false }] },
    { name: "Иванов И.И.", labWorks: [{ score: 84, passed: true }] },

    { name: "Петров П.П.", labWorks: [{ score: 75, passed: true }] },

    { name: "Сидоров С.С.", labWorks: [{ score: 50, passed: false }] },
  ];
  // const labAssignments = [
  //   {
  //     title: "Лабораторная работа 1",

  //     description:
  //       "Создайте программу, которая принимает три числа и выводит их сумму.",
  //   },

  //   {
  //     title: "Лабораторная работа 2",

  //     description:
  //       "Реализуйте алгоритм сортировки массива с использованием пузырьковой сортировки.",
  //   },

  //   {
  //     title: "Лабораторная работа 3",

  //     description:
  //       "Напишите программу, которая определяет, является ли число простым.",
  //   },

  //   {
  //     title: "Лабораторная работа 4",

  //     description:
  //       "Создайте интерфейс для добавления и удаления элементов из списка.",
  //   },
  // ];

  return (
    <Container>
      {/* <div className="mainWindow">
        {labAssignments.map((assignment, index) => (
          <InputOutputTask
            key={index}
            upperText={assignment.title}
            lowerText={assignment.description}
          />
        ))}
      </div> */}

      <StudentListTitle>Список студентов:</StudentListTitle>

      <SearchContainer>
        <SearchInputContainer>
          <SearchInput type="text" placeholder="Поиск студента..." />

          <SearchIcon onClick={handleSearch} />
        </SearchInputContainer>

        <div>
          <Select>
            <option value="">Сортировать по</option>

            <option value="option1">Опция 1</option>

            <option value="option2">Опция 2</option>
          </Select>

          <Select>
            <option value="">Группа</option>

            <option value="group1">Группа 1</option>

            <option value="group2">Группа 2</option>
          </Select>
        </div>
      </SearchContainer>

      <div>
        {studentsLabWorks.map((student, index) => (
          <StudentLabs
            key={index}
            studentName={student.name}
            labWorks={student.labWorks}
          />
        ))}
      </div>
    </Container>
  );
};

export default CheckLaboratory;
