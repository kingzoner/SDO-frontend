import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import {
  getStudentsLabs,
  deleteLab,
  toggleStatusLab,
} from "../../api/teacher-api";
import { getGroups } from "../../api/other-api";

const Container = styled.div`
  padding: 0 200px;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    padding: 0 100px;
  }

  @media (max-width: 900px) {
    padding: 0 50px;
  }

  @media (max-width: 768px) {
    padding: 0 20px;
  }

  @media (max-width: 480px) {
    padding: 0 16px;
  }
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
  box-sizing: border-box;

  .section__lab-blockSearch {
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
  }

  .section__lab-input {
    width: 395px;
    height: 26px;
    padding: 10px;
    background: #f0f0f0;
    border-style: none;
    border-radius: 4px;
    font-size: 16px;
    box-sizing: border-box;
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
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .section__groups-button {
    width: 200px;
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
    box-sizing: border-box;
  }

  .section__lab-button:hover {
    background: #c8d5f6;
    color: #fff;
    border-style: none;
    transition: 0.5s;
  }
  .section__groups-button:hover {
    background: #c8d5f6;
    color: #fff;
    border-style: none;
    transition: 0.5s;
  }

  .alternate-color {
    background: rgba(216, 216, 216, 0.38);
  }

  .section__login-formSelect {
    width: 200px;
    font-family: "Montserrat";
    cursor: pointer;
    height: 47px;
    border: none;
    background-color: #f0f0f0;
    padding: 0 10px;
    font-size: 16px;
    color: #000;
    text-align: center;
    border-radius: 8px;
    box-sizing: border-box;
    &:focus {
      outline: none;
    }
  }

  @media (max-width: 768px) {
    padding: 0px 16px 20px;
    gap: 12px;

    .section__lab-button {
      width: 100%;
      max-width: 395px;
      font-size: 14px;
    }

    .section__groups-button {
      width: 100%;
      max-width: 200px;
    }

    .section__login-formSelect {
      width: 100%;
      max-width: 200px;
      font-size: 14px;
    }
  }

  @media (max-width: 480px) {
    padding: 0px 12px 20px;
    gap: 10px;

    .section__lab-button {
      font-size: 13px;
      padding: 8px;
    }

    .section__groups-button {
      font-size: 14px;
      padding: 8px;
    }

    .section__login-formSelect {
      font-size: 14px;
      height: 42px;
    }
  }
`;

const NameLab = styled.p`
  color: #000;
  margin-left: 20px;
  text-align: left;
  font-weight: bold;
  font-family: "Montserrat";
  font-size: 19px;
  margin-right: 10px;
  word-wrap: break-word;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    font-size: 17px;
    margin-left: 12px;
    margin-right: 8px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
    margin-left: 8px;
    margin-right: 6px;
  }
`;

const ListLab = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 1236px;
  padding: 0;
  margin: 0;
  list-style: none;
  box-sizing: border-box;

  @media (max-width: 1300px) {
    max-width: 100%;
    padding: 0 20px;
  }

  @media (max-width: 768px) {
    padding: 0 16px;
    gap: 12px;
  }

  @media (max-width: 480px) {
    padding: 0 12px;
    gap: 10px;
  }

  .section__lab-page {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    border-radius: 7px;

    @media (max-width: 768px) {
      padding: 16px;
    }

    @media (max-width: 480px) {
      padding: 12px;
    }
  }
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
  box-sizing: border-box;
  flex-shrink: 0;

  &:hover {
    background: #ff7070;
    color: #fff;
    border-style: none;
    transition: 0.5s;
  }

  @media (max-width: 768px) {
    width: 150px;
    font-size: 14px;
    padding: 8px;
  }

  @media (max-width: 570px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    padding: 8px;
  }
`;

const SpnLab = styled.span`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;

  .section__lab-edit {
    padding: 10px;
    margin: 0;
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
    box-sizing: border-box;
    flex-shrink: 0;
  }

  .section__lab-edit:hover {
    background: #c8d5f6;
    color: #fff;
    border-style: none;
  }

  @media (max-width: 768px) {
    gap: 8px;
    margin-top: 12px;

    .section__lab-edit {
      width: 150px;
      font-size: 14px;
      padding: 8px;
    }
  }

  @media (max-width: 570px) {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;

    .section__lab-edit {
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    gap: 6px;
    margin-top: 10px;

    .section__lab-edit {
      font-size: 13px;
      padding: 8px;
    }
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
  margin: 0;
  box-sizing: border-box;
  flex-shrink: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background-color: #a3c8d1;
    transition: 0.3s;
  }

  @media (max-width: 768px) {
    width: 150px;
    font-size: 14px;
    padding: 8px;
    height: 36px;
  }

  @media (max-width: 570px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    padding: 8px;
    height: 34px;
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
  gap: 10px;
  flex-wrap: wrap;
  box-sizing: border-box;

  @media (max-width: 1300px) {
    width: 100%;
    max-width: 1236px;
    margin: 40px 20px 0px 20px;
  }

  @media (max-width: 768px) {
    margin: 30px 0px 0px 0px;
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }

  @media (max-width: 480px) {
    margin: 20px 0px 0px 0px;
    gap: 10px;
  }
`;
const SearchInputContainer = styled.div`
  position: relative;
  width: 395px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 395px;
  }

  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

const Notification = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 15px 20px;
  border-radius: 5px;
  color: #fff;
  font-family: "Montserrat";
  font-size: 14px;
  background-color: #28a745;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: translateY(${({ visible }) => (visible ? "0" : "20px")});
  transition: opacity 0.5s ease, transform 0.5s ease;
  z-index: 1000;

  &.error {
    background-color: #dc3545;
  }
`;

const TextStyle = styled.p`
  font-family: "Montserrat", sans-serif;
  font-size: 18px;
  margin: 0;
  text-align: center;
  color: #000;
  padding: 20px;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100px;
`;

const Laboratory = () => {
  const [labItems, setLabItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [notification, setNotification] = useState({
    message: "",
    visible: false,
    isError: false,
  });
  const [groups, setGroups] = useState([]);

  const handleSearch = () => {
    console.log("Поиск запущен!");
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const fetchLabs = async () => {
    try {
      const response = await getStudentsLabs();
      if (response.status === 200) {
        setLabItems(response.data);
      } else {
        throw new Error("Failed to fetch unpublished labs");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchGroups = async () => {
    try {
      const response = await getGroups();
      setGroups(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке групп:", error.message);
      setGroups([]);
    }
  };

  const deleteStudentsLab = async (labId) => {
    try {
      const response = await deleteLab(labId);
      if (response.status === 200 || response.status === 204) {
        return true;
      } else {
        throw new Error("Failed to delete lab");
      }
    } catch (error) {
      console.error("Ошибка при удалении лабораторной работы:", error.message);
      return false;
    }
  };

  const toggleLab = async (labId) => {
    try {
      const response = await toggleStatusLab(labId);
      if (response.status === 200 || response.status === 201) {
        return true;
      } else {
        throw new Error("Ошибка изменения статуса лабораторной работы");
      }
    } catch (error) {
      console.error(
        "Ошибка при изменении статуса лабораторной работы:",
        error.message
      );
      return false;
    }
  };

  const handleDeleteClick = async (labId, index) => {
    const success = await deleteStudentsLab(labId);
    if (success) {
      setLabItems(labItems.filter((item) => item.id !== labId));
      setNotification({
        message: "Лабораторная работа успешно удалена!",
        visible: true,
        isError: false,
      });
      setTimeout(
        () => setNotification({ ...notification, visible: false }),
        3000
      );
    } else {
      setNotification({
        message: "Ошибка при удалении лабораторной работы!",
        visible: true,
        isError: true,
      });
      setTimeout(
        () => setNotification({ ...notification, visible: false }),
        3000
      );
    }
  };

  const handleUpdateStatusLabClick = async (labId, index) => {
    const success = await toggleLab(labId);
    if (success) {
      setLabItems((prevItems) =>
        prevItems.map((item) =>
          item.id === labId
            ? {
                ...item,
                status:
                  item.status === "published" ? "unpublished" : "published",
              }
            : item
        )
      );
      setNotification({
        message: "Статус лабораторной работы успешно изменен!",
        visible: true,
        isError: false,
      });
      setTimeout(
        () => setNotification({ ...notification, visible: false }),
        3000
      );
    } else {
      setNotification({
        message: "Ошибка при измении статуса лабораторной работы!",
        visible: true,
        isError: true,
      });
      setTimeout(
        () => setNotification({ ...notification, visible: false }),
        3000
      );
    }
  };

  useEffect(() => {
    fetchLabs();
    fetchGroups();
  }, []);

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
            <SearchInput
              type="text"
              placeholder="Поиск лабораторной"
              value={searchValue}
              onChange={handleSearchChange}
            />
            <SearchIcon onClick={handleSearch} />
          </SearchInputContainer>
          <Link
            to="/LaboratoryAdd"
            id="buttonAdd"
            className="section__lab-button"
          >
            Добавить новую Лабораторную работу
          </Link>
          <select
            name="group_name"
            className="section__login-formSelect"
          >
            {groups.length === 0 ? (
              <option value="">Загрузка групп...</option>
            ) : (
              groups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))
            )}
          </select>
        </SearchContainer>
        {labItems.length === 0 ? (
          <TextStyle>Лабораторные работы не найдены</TextStyle>
        ) : (
          <ListLab>
            {labItems.map((item, index) => (
              <li className={getColors(index)} key={item.id}>
                <NameLab>
                  {item.name} (Предмет: {item.subject})
                </NameLab>
                <SpnLab>
                  <Link
                    to={`/PrepodRedLab/${item.id}`}
                    className="section__lab-edit"
                  >
                    Редактировать
                  </Link>
                  <ButtonDelete
                    onClick={() => handleDeleteClick(item.id, index)}
                  >
                    Удалить
                  </ButtonDelete>
                  {item.status === "published" ? (
                    <PublishButton
                      style={{
                        backgroundColor: "#e0e0e0",
                        color: "#555",
                      }}
                      onClick={() => handleUpdateStatusLabClick(item.id, index)}
                    >
                      Открепить
                    </PublishButton>
                  ) : (
                    <PublishButton
                      onClick={() => handleUpdateStatusLabClick(item.id, index)}
                    >
                      Опубликовать
                    </PublishButton>
                  )}
                </SpnLab>
              </li>
            ))}
          </ListLab>
        )}
      </SectionLab>
      <Notification
        className={notification.isError ? "error" : ""}
        visible={notification.visible}
      >
        {notification.message}
      </Notification>
    </>
  );
};

export default Laboratory;