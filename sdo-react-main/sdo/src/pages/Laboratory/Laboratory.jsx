import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../../styles/style.css";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const Container = styled.div`
  padding: 0 200px;
`;
const Select = styled.select`
  width: 231px;
  font-family: "Montserrat";
  cursor: pointer;
  height: 47px;
  margin-left: 20px;
  border: none;
  background-color: #f0f0f0;
  padding: 0;
  font-size: 16px;
  color: #000;
  text-align: center;
  border-radius: 8px;
  &:focus {
    outline: none;
  }
`;
const SectionLab = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 0px 0px 20px;
  .section__lab-blockSearch {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .section__lab-input {
    width: 395px;
    height: 26px;
    padding: 10px;
    background: #f0f0f0;
    border-style: none;
    border-radius: 4px;
    font-size: 16px;
  }

  .section__lab-input:focus {
    outline-width: 0;
  }

  .section__lab-block {
    padding: 60px 355px 0px 0px;
  }

  .section__lab-button {
    width: 395px;
    padding: 10px;
    border-radius: 4px;
    text-align: center;
    color: #000;
    font-family: "Montserrat";
    line-height: 27px;
    text-decoration: none;
    background: #f0f0f0;
    border-style: none;
    border-radius: 4px;
  }

  .section__lab-button:hover {
    background: #c8d5f6;
    color: #fff;
    border-style: none;
    transition: 0.5s;
  }

  .alternate-color {
    background: rgba(216, 216, 216, 0.38);
  }
`;

const NameLab = styled.p`
  color: #000;
  margin-left: 20px;
  text-align: left;
  font-weight: bold;
  font-family: "Montserrat";
  font-size: 19px;
`;

const ListLab = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ButtonDelete = styled.button`
  padding: 10px;
  width: 180px;
  background-color: white;
  display: flex;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-family: "Montserrat";
  font-size: 16px;
  border: 0px solid #000;

  &:hover {
    background: #ff7070;
    color: #fff;
    border-style: none;
    transition: 0.5s;
  }
`;

const SpnLab = styled.span`
  display: flex;
  align-items: center;
  .section__lab-edit {
    padding: 10px;
    margin: auto 30px;
    width: 180px;
    background-color: white;
    color: #000;
    border: 0px solid #000;
    display: flex;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    font-family: "Montserrat";
    font-size: 16px;
    transition: background 0.5s, color 0.5s;
  }

  .section__lab-edit:hover {
    background: #c8d5f6;
    color: #fff;
    border-style: none;
  }
`;

const PublishButton = styled.button`
  width: 180px;
  padding: 10px;
  height: 39px;
  border-radius: 4px;
  background-color: #becbee;
  color: #000;
  border: none;
  cursor: pointer;
  font-family: "Montserrat";
  font-size: 16px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 30px 0px auto;
  &:hover {
    background-color: #a3c8d1;
    transition: 0.3s;
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
const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 15px;
  font-family: "Montserrat";
  top: 50%;
  transform: translateY(-50%);
  color: #000;
  cursor: pointer;
`;
const SearchContainer = styled.div`
  display: flex;
  margin: 40px 0px 0px 40px;
  justify-content: space-between;
  width: 1236px;
`;
const SearchInputContainer = styled.div`
  position: relative;
  width: 395px;
`;

const Laboratory = () => {
  const [labItems, setLabItems] = useState([]);

  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    console.log("Поиск запущен!");
  };
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleDeleteClick = (index) => {
    const updatedLabItems = [...labItems];

    updatedLabItems.splice(index, 1);

    setLabItems(updatedLabItems);
  };

  const handlePublishClick = (item) => {
    console.log(`Опубликована: ${item.title}`);
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/tasks", {
      method: "GET",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch tasks");
        }
      })

      .then((data) => {
        setLabItems(data);
      })

      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  const labItem = [
    {
      title: 'Лабораторная №1 "Создание программы с использованием классов"',
    },

    {
      title: 'Лабораторная №2 "Создание программы с использованием классов"',
    },

    {
      title: 'Лабораторная №3 "Создание программы с использованием классов"',
    },

    {
      title: 'Лабораторная №4 "Создание программы с использованием классов"',
    },

    {
      title: 'Лабораторная №5 "Создание программы с использованием классов"',
    },
    {
      title: 'Лабораторная №5 "Создание программы с использованием классов"',
    },
    {
      title: 'Лабораторная №5 "Создание программы с использованием классов"',
    },
    {
      title: 'Лабораторная №5 "Создание программы с использованием классов"',
    },
  ];

  const getColors = (index) => {
    return index % 2 === 0
      ? "section__lab-page"
      : "section__lab-page alternate-color";
  };

  return (
    <>
      <SectionLab>
        <SearchContainer>
          <SearchInputContainer>
            <SearchInput type="text" placeholder="Поиск лабораторной" />{" "}
            <SearchIcon
              type="text"
              onClick={handleSearchChange}
              value={searchValue}
            />
          </SearchInputContainer>

          <Link
            to="/LaboratoryAdd"
            id="buttonAdd"
            className="section__lab-button"
          >
            Добавить новую Лабораторную работу
          </Link>
          <div>
            <Select>
              <option value="">Все группы</option>

              <option value="group1">221-271</option>

              <option value="group2">221-272</option>
            </Select>
          </div>
        </SearchContainer>

        <ListLab>
          {labItem.map((item, index) => (
            <li className={getColors(index)} key={index}>
              <NameLab>{item.title}</NameLab>

              <SpnLab>
                <Link to="/editingLaboratoryPrep" className="section__lab-edit">
                  Редактировать
                </Link>

                <ButtonDelete onClick={() => handleDeleteClick(index)}>
                  Удалить
                </ButtonDelete>
                <PublishButton>Опубликовать</PublishButton>
              </SpnLab>
            </li>
          ))}
        </ListLab>
      </SectionLab>
    </>
  );
};

export default Laboratory;
