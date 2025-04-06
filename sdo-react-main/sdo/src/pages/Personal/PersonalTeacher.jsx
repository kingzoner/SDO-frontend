import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../api/user-api";
import { getSubjects } from "../../api/subjects-api";
// Предполагаемые API-методы, добавь их в соответствующие файлы
import { getLabs, getGroups } from "../../api/teacher-api";

const SectionLab = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  padding: 75px 0px 100px;
`;

const List = styled.li`
  width: 320px;
  height: 100px;
  background-color: #d5def6;
  border-radius: 7px;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BigList = styled.li`
  width: ${({ $Block }) => ($Block ? "673px" : "673px")};
  height: ${({ $Block }) => ($Block ? "auto" : "430px")}; /* Динамическая высота для контента */
  background-color: #e2edd0;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style-type: none;
  justify-content: space-around;
  padding: 20px;
`;

const ListItem = styled.li`
  width: 520px;
  height: 50px;
  background-color: #fff;
  border-radius: 7px;
  list-style-type: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const Text = styled.p`
  font-family: "Montserrat";
  font-size: 16px;
  font-weight: 600;
`;

const RowBlocks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 0px 0px 20px;
`;

const Button = styled.div`
  width: 100px;
  height: 40px;
  background-color: #c8d5f6;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const PersonalTeacher = () => {
  const navigate = useNavigate();

  const [teacherInfo, setTeacherInfo] = useState({
    first_name: "",
    last_name: "",
    middle_name: "",
  });

  useEffect(() => {
    // Загрузка данных преподавателя
    getUserData()
      .then((res) => {
        setTeacherInfo(res.data);
      })
      .catch((error) => {
        console.error("Ошибка загрузки данных преподавателя:", error.message);
      });

      // загрузка остальных данных

  }, []);

  return (
    <SectionLab>
      <RowBlocks>
        <List>
          <Text>ФИО преподавателя:</Text>
          <Text>
            {teacherInfo.first_name} {teacherInfo.last_name}{" "}
            {teacherInfo.middle_name}
          </Text>
        </List>
        <List>
          <Text>Факультет:</Text>
        </List>
        <List>
          <Text>Группы:</Text>
        </List>
      </RowBlocks>
      <RowBlocks>
        <BigList>
          <Text>Дисциплины:</Text>
        </BigList>
        <BigList>
          <Text>Список лабораторных работ:</Text>
        </BigList>
        <BigList>
          <Text>Список групп:</Text>
        </BigList>
      </RowBlocks>
    </SectionLab>
  );
};

export default PersonalTeacher;