import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../../styles/style.css";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { getTasks } from "../../api/tasks-api";

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
    cursor: pointer;
  }

  .section__lab-btn:hover {
    background: #D9D9D9;
    transition: 0.3s;
  }

  .section__lab-btn.active {
    background: #BECBEE;
    color: #fff;
  }
`;

const NameLab = styled.p`
  color: #000;
  font-family: "Montserrat";
  font-size: 19px;
  margin: 0;
`;

const ListLab = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 1270px;
  list-style: none;
  padding: 0;
`;

const LabItem = styled.li`
  width: 100%;
  padding: 40px;
  font-size: 18px;
  font-family: Montserrat;
  background: ${(props) => (props.isCompleted ? "#E6F4CF" : "#f0f0f0")};
  border-radius: 7px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`;

const TaskButton = styled.button`
  width: 161px;
  height: 39px;
  background-color: #BECBEE;
  font-size: 14px;
  font-family: "Montserrat";
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #D9D9D9;
  }
`;

const SearchInputContainer = styled.div`
  position: relative;
  width: 335px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 47px;
  box-sizing: border-box;
  background-color: #f0f0f0;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: 16px;
  font-family: "Montserrat";
  color: #000;
  text-align: center;
  padding: 0 40px 0 20px;

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
  const [filter, setFilter] = useState("all"); // all, completed, notCompleted
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await getTasks();
        const formattedData = response.data.map(([id, title, isCompleted]) => ({
          id,
          title,
          isCompleted,
        }));
        setLabItems({ isLoading: false, data: formattedData });
      } catch (error) {
        console.error("Failed to fetch labs:", error);
        setLabItems({ isLoading: false, data: [] });
      }
    };

    fetchLabs();
  }, []);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleLabClick = (id) => {
    navigate(`/labaStud/${id}`);
  };

  const filteredLabs = labItems.data
    .filter((lab) => lab.title.toLowerCase().includes(searchValue.toLowerCase()))
    .filter((lab) => {
      if (filter === "completed") return lab.isCompleted;
      if (filter === "notCompleted") return !lab.isCompleted;
      return true;
    });

  return (
    <SectionLab>
      <div className="section__lab-blockSearch">
        <SearchInputContainer>
          <SearchInput
            type="text"
            placeholder="Поиск лабораторной..."
            value={searchValue}
            onChange={handleSearchChange}
          />
          <SearchIcon />
        </SearchInputContainer>
        <button
          className={`section__lab-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => handleFilterChange("all")}
        >
          Все лабораторные
        </button>
        <button
          className={`section__lab-btn ${filter === "completed" ? "active" : ""}`}
          onClick={() => handleFilterChange("completed")}
        >
          Выполнено
        </button>
        <button
          className={`section__lab-btn ${filter === "notCompleted" ? "active" : ""}`}
          onClick={() => handleFilterChange("notCompleted")}
        >
          Не выполнено
        </button>
      </div>

      <ListLab>
        {labItems.isLoading ? (
          <p>Загрузка...</p>
        ) : filteredLabs.length === 0 ? (
          <p>Лабораторные не найдены</p>
        ) : (
          filteredLabs.map((lab) => (
            <LabItem key={lab.id} isCompleted={lab.isCompleted}>
              <NameLab>{lab.title}</NameLab>
              <TaskButton onClick={() => handleLabClick(lab.id)}>Перейти</TaskButton>
            </LabItem>
          ))
        )}
      </ListLab>
    </SectionLab>
  );
};

export default StudLaboratory;