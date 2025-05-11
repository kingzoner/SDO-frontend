import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../api/user-api";
import { getGroups, getSubjects } from "../../api/teacher-api";

const SectionLab = styled.div`
  display: flex;
  gap: 20px;
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

const ListSubject = styled.div`
  width: 100%;
  max-width: 500px;
  height: 40px;
  padding: 10px 25px;
  background-color: #fff;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 10px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const TextDiscipline = styled.p`
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  margin: 0;
  text-align: center;
  color: #000;
`;

const BigList = styled.li`
  width: 800px;
  background-color: #e6f4cf;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 10px;
`;

const Text = styled.p`
  font-family: "Montserrat";
  font-size: 16px;
`;

const TextDisciplines = styled.p`
  font-family: "Montserrat";
  font-size: 16px;
  align-items: center;
  text-align: center;
  font-weight: 600;
`;

const RowBlocks = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 10px;
`;

const GroupsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const PersonalTeacher = () => {
  const navigate = useNavigate();

  const [teacherInfo, setTeacherInfo] = useState({
    first_name: "",
    last_name: "",
    middle_name: "",
    faculty: "",
  });

  const [groups, setGroups] = useState([]);

  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    getUserData()
      .then((res) => {
        setTeacherInfo(res.data);
      })
      .catch((error) => {
        console.error("Ошибка загрузки данных преподавателя:", error.message);
      });

    getGroups()
      .then((res) => {
        setGroups(res.data);
      })
      .catch((error) => {
        console.error("Ошибка загрузки групп:", error.message);
        setGroups([]);
      });

    getSubjects()
      .then((res) => {
        setSubjects(res.data);
      })
      .catch((error) => {
        console.error("Ошибка загрузки дисциплин преподавателя:", error.message);
        setSubjects([]);
      });
  }, []);

  const handleGroupClick = (groupId) => {
    navigate(`/Groups/${groupId}`);
  };

  const handleSubjectClick = (subjectId) => {
    navigate(`/Subjects/${subjectId}`);
  };

  return (
    <SectionLab>
      <RowBlocks>
        <List>
          <Text>ФИО преподавателя:</Text>
          <TextDisciplines>
            {teacherInfo.last_name} {teacherInfo.first_name} {" "}
            {teacherInfo.middle_name}
          </TextDisciplines>
        </List>
        <List>
          <Text>Факультет:</Text>
          <TextDisciplines>{teacherInfo.faculty}</TextDisciplines>
        </List>
      </RowBlocks>
      <RowBlocks>
        <BigList>
          <Text>Дисциплины:</Text>
          <GroupsContainer>
            {subjects.length > 0 ? (
              subjects.map((subject) => (
                <ListSubject
                  key={subject.id}
                  onClick={() => handleSubjectClick(subject.id)}
                >
                  <TextDiscipline>{subject.name}</TextDiscipline>
                </ListSubject>
              ))
            ) : (
              <Text>Дисциплины не найдены</Text>
            )}
          </GroupsContainer>
        </BigList>
        <BigList>
          <Text>Список групп:</Text>
          <GroupsContainer>
            {groups.length > 0 ? (
              groups.map((group) => (
                <ListSubject
                  key={group.id}
                  onClick={() => handleGroupClick(group.id)}
                >
                  <TextDiscipline>{group.name}</TextDiscipline>
                </ListSubject>
              ))
            ) : (
              <Text>Группы не найдены</Text>
            )}
          </GroupsContainer>
        </BigList>
      </RowBlocks>
    </SectionLab>
  );
};

export default PersonalTeacher;