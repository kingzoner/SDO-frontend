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
  box-sizing: border-box;
  width: 100%;

  .section__lab-blockSearch {
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    max-width: 1270px;
    padding: 0 20px;
    box-sizing: border-box;
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
    box-sizing: border-box;
    white-space: nowrap;
    transition: all 0.3s ease;
    overflow: hidden;
  }

  .section__lab-btn:hover {
    background: #D9D9D9;
    transition: 0.3s;
  }

  .section__lab-btn.active {
    background: #BECBEE;
    color: #fff;
  }

  @media (max-width: 768px) {
    padding: 20px 0px 16px;
    gap: 12px;

    .section__lab-blockSearch {
      padding: 0 16px;
      gap: 8px;
    }

    .section__lab-btn {
      width: auto;
      flex: 1;
      min-width: 0;
      max-width: 280px;
      font-size: 14px;
      padding: 8px;
    }
  }

  @media (max-width: 570px) {
    padding: 16px 0px 12px;
    gap: 10px;

    .section__lab-blockSearch {
      flex-direction: column;
      align-items: stretch;
      padding: 0 12px;
    }

    .section__lab-btn {
      width: 100%;
      max-width: 100%;
      font-size: 13px;
    }
  }

  @media (max-width: 480px) {
    padding: 12px 0px 10px;
    gap: 8px;

    .section__lab-blockSearch {
      padding: 0 10px;
      gap: 6px;
    }

    .section__lab-btn {
      font-size: 12px;
      padding: 8px 6px;
    }
  }
`;

const NameLab = styled.p`
  color: #000;
  font-family: "Montserrat";
  font-size: 19px;
  margin: 0;
  flex: 1;
  word-wrap: break-word;
  overflow-wrap: break-word;
  min-width: 0;

  @media (max-width: 768px) {
    font-size: 17px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

const ListLab = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 1270px;
  list-style: none;
  padding: 0 20px;
  margin: 0;
  box-sizing: border-box;

  @media (max-width: 1300px) {
    max-width: 100%;
  }

  @media (max-width: 768px) {
    padding: 0 16px;
    gap: 12px;
  }

  @media (max-width: 480px) {
    padding: 0 12px;
    gap: 10px;
  }
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
  gap: 15px;

  @media (max-width: 768px) {
    padding: 24px 20px;
    font-size: 16px;
    gap: 12px;
  }

  @media (max-width: 570px) {
    flex-direction: column;
    align-items: stretch;
    padding: 20px 16px;
    gap: 12px;
  }

  @media (max-width: 480px) {
    padding: 16px 12px;
    font-size: 15px;
    gap: 10px;
    border-radius: 6px;
  }
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
  flex-shrink: 0;
  box-sizing: border-box;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background-color: #D9D9D9;
  }

  @media (max-width: 768px) {
    width: 140px;
    height: 36px;
    font-size: 13px;
  }

  @media (max-width: 570px) {
    width: 100%;
    height: 38px;
  }

  @media (max-width: 480px) {
    height: 34px;
    font-size: 12px;
  }
`;

const SearchInputContainer = styled.div`
  position: relative;
  width: 335px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 335px;
  }

  @media (max-width: 570px) {
    max-width: 100%;
  }
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