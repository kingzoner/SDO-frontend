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
  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding: 60px 20px 80px;
    gap: 18px;
  }

  @media (max-width: 900px) {
    padding: 50px 20px 70px;
    gap: 16px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 40px 16px 80px;
    gap: 30px;
  }

  @media (max-width: 570px) {
    padding: 36px 16px 70px;
    gap: 28px;
  }

  @media (max-width: 480px) {
    padding: 32px 16px 60px;
    gap: 24px;
  }
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
  box-sizing: border-box;

  @media (max-width: 1024px) {
    width: 300px;
    height: 95px;
  }

  @media (max-width: 900px) {
    width: 280px;
    height: 90px;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 500px;
    min-height: 90px;
    height: auto;
    padding: 16px;
  }

  @media (max-width: 570px) {
    max-width: 100%;
    min-height: 85px;
    padding: 14px;
  }

  @media (max-width: 480px) {
    max-width: 100%;
    min-height: 80px;
    padding: 12px;
  }
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
  box-sizing: border-box;
  &:hover {
    background-color: #f0f0f0;
  }

  @media (max-width: 768px) {
    height: auto;
    min-height: 40px;
    padding: 10px 20px;
  }

  @media (max-width: 570px) {
    padding: 10px 18px;
  }

  @media (max-width: 480px) {
    padding: 10px 16px;
    font-size: 14px;
  }
`;

const TextDiscipline = styled.p`
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  margin: 0;
  text-align: center;
  color: #000;

  @media (max-width: 768px) {
    font-size: 15px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
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
  box-sizing: border-box;

  @media (max-width: 1024px) {
    width: 100%;
    max-width: 700px;
    padding: 18px;
  }

  @media (max-width: 900px) {
    max-width: 600px;
    padding: 18px 16px;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 500px;
    padding: 20px 16px;
  }

  @media (max-width: 570px) {
    max-width: 100%;
    padding: 18px 14px;
    gap: 9px;
  }

  @media (max-width: 480px) {
    max-width: 100%;
    padding: 16px 12px;
    gap: 8px;
  }
`;

const Text = styled.p`
  font-family: "Montserrat";
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 15px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const TextDisciplines = styled.p`
  font-family: "Montserrat";
  font-size: 16px;
  align-items: center;
  text-align: center;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 15px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const RowBlocks = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 10px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    gap: 9px;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 500px;
    gap: 10px;
  }

  @media (max-width: 570px) {
    max-width: 100%;
    gap: 11px;
  }

  @media (max-width: 480px) {
    max-width: 100%;
    gap: 12px;
  }
`;

const GroupsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  box-sizing: border-box;

  @media (max-width: 570px) {
    gap: 9px;
  }

  @media (max-width: 480px) {
    gap: 8px;
  }
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