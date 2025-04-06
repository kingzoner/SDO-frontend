import { Link, useNavigate } from "react-router-dom";  
import React, { useState, useEffect } from "react";
import "../../styles/style.css";
import styled from 'styled-components';
import { FaSearch } from "react-icons/fa";

const SectionLab = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 25px 0px 20px;
    
    .section__lab-blockSearch {
        display: flex;
        gap: 10px;
        align-items: center;
    }

    .section__lab-input {
        width: 290px;
        height: 26px;
        padding: 10px;
        background: #F0F0F0;
        border: none;
        border-radius: 4px;
        font-size: 16px;
    }

    .section__lab-input:focus {
        outline: none;
    }

    .section__lab-button {
        width: 285px;
        padding: 10px;
        border-radius: 4px;
        text-align: center;
        color: #000;
        font-family: 'Montserrat';
        line-height: 27px;
        text-decoration: none;
        background: #F0F0F0;
        border: none;
        font-size: 10px;
    }

    .section__lab-btn {
        width: 280px;
        padding: 10px;
        font-size: 16px;
        text-align: center;
        color: #000;
        font-family: Montserrat;
        line-height: 27px;
        text-decoration: none;
        background: #F0F0F0;
        border: none;
        border-radius: 4px;
    }

    .section__lab-btn:hover {
        background: #D9D9D9;
        transition: 0.3s;
    }

.section__lab-list {
    width: 1270px;
    height: 60px;
    padding: 40px;
    font-size: 18px;
    font-family: Montserrat;
    background: #f0f0f0;
    text-align: left;
    border-radius: 7px;
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
}


    .section__lab-list-ready {
        width: 1270px;
        padding: 40px;
        font-size: 18px;
        text-align: left;
        color: #000;
        font-family: Montserrat;
        background: #E6F4CF;
        border-radius: 7px;
        display: block;
        border: none;
        box-sizing: border-box;
    }
`;

const NameLab = styled.p`
    color: #000;
    text-align: center;
    font-family: 'Montserrat';
    font-size: 19px;
    padding-left: 5%;
`;

const ListLab = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const TaskBlock = styled.div`
    background: #fff;
    border-radius: 10px;
    margin-bottom: 20px;
    margin-top: 20px;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const TaskButton = styled.button`
    width: 161px;
    height: 39px;
    background-color: #BECBEE;
    font-size: 14px;
    font-family: 'Montserrat';
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #D9D9D9;
    }
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const SearchInputContainer = styled.div`
  position: relative;
  width: 335px; // Search box width
`;

const SearchInput = styled.input`
  padding: 0;
  width: 100%;
  height: 47px;
  box-sizing: border-box;
  background-color: #f0f0f0;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: 16px;
  font-family: 'Montserrat';
  color: #000;
  text-align: center;

  &:focus {
    outline: none;
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #000;
`;

const StudLaboratory = () => {
    const [labItems, setLabItems] = useState({ isLoading: true, data: [] });
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleDeleteClick = (index) => {
        const updatedLabItems = [...labItems.data];
        updatedLabItems.splice(index, 1);
        setLabItems((prev) => ({ ...prev, data: updatedLabItems }));
    };

    const handleSearch = () => {
        console.log("Search value:", searchValue);
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLabItems((prev) => ({ ...prev, isLoading: false }));
        }, 5000);
        return () => {
            clearTimeout(timeout);
        };
    }, []);

    useEffect(() => {
        fetch('http://0.0.0.0:8000/tasks', {
            method: 'GET',
            headers: {
                'accept': 'application/json'
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Failed to fetch tasks");
                }
            })
            .then((data) => {
                const tasksArray = Object.keys(data).map((key) => ({
                    id: key,
                    description: data[key].description,
                    tasks: data[key].tasks || [] 
                }));
                setLabItems({ isLoading: false, data: tasksArray });
            })
            .catch(error => {
                console.error(error.message);
            });
    }, []);

    const getColors = (index) => {
        return index % 2 === 0 ? "section__lab-number" : "section__lab-number alternate-color";
    };

    const handleLabClick = (id) => {
        navigate(`/labaStud/${id}`);  
    };

    return (
        <>
            <SectionLab>
                <div className="section__lab-block">
                    <div className="section__lab-blockSearch">
                        <SearchInputContainer>
                            <SearchInput
                                type="text"
                                placeholder="Поиск студента..."
                                value={searchValue}
                                onChange={handleSearchChange}
                            />
                            <SearchIcon onClick={handleSearch} />
                        </SearchInputContainer>
                        <Link id="buttonAdd" className="section__lab-btn">Все лабораторные</Link>
                        <Link id="buttonAdd" className="section__lab-btn">Выполнено</Link>
                        <Link id="buttonAdd" className="section__lab-btn">Не выполнено</Link>
                    </div>

                    {/* Лабораторная №1 */}
                    <div className="section__lab-list">
                        Лабораторная №1: “Создание программы с использованием классов”
                        <TaskButton onClick={() => handleLabClick(1)} className="task-button">Перейти</TaskButton>
                    </div>

                    {/* Лабораторная №2 */}
                    <div className="section__lab-list-ready">
                        Лабораторная №2: “Создание программы с использованием классов”
                        {/* Task Blocks for Laboratory №2 */}
                        <TaskBlock>
                            <span>Задача 1: Создать класс</span>
                            <TaskButton onClick={() => handleLabClick('2')}>Перейти</TaskButton>
                        </TaskBlock>
                        <TaskBlock>
                            <span>Задача 2: Написать методы</span>
                            <TaskButton onClick={() => handleLabClick('2')}>Перейти</TaskButton>
                        </TaskBlock>
                        <TaskBlock>
                            <span>Задача 3: Протестировать код</span>
                            <TaskButton onClick={() => handleLabClick('2')}>Перейти</TaskButton>
                        </TaskBlock>
                    </div>
                </div>

                <ListLab>
                    {labItems.isLoading ? (
                        <p>Загрузка...</p>
                    ) : (
                        labItems.data
                            .filter(lab => lab.description.toLowerCase().includes(searchValue.toLowerCase()))
                            .map((labItem, index) => (
                                <li className={getColors(index)} key={labItem.id}>
                                    <NameLab>{labItem.description}</NameLab>
                                    {labItem.tasks.length > 0 ? (
                                        labItem.tasks.map((task, taskIndex) => (
                                            <TaskBlock key={taskIndex}>
                                                <span>{`Задача ${taskIndex + 1}: ${task}`}</span>
                                                <TaskButton onClick={() => handleLabClick(`${labItem.id}/task${taskIndex + 1}`)}>
                                                    Перейти
                                                </TaskButton>
                                            </TaskBlock>
                                        ))
                                    ) : (
                                        <TaskButton onClick={() => handleLabClick(labItem.id)}>
                                            Перейти
                                        </TaskButton>
                                    )}
                                </li>
                            ))
                    )}
                </ListLab>
            </SectionLab>
        </>
    );
};

export default StudLaboratory;
