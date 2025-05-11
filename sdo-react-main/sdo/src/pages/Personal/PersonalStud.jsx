import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { getUserData } from '../../api/user-api';
import { getSubjects } from '../../api/subjects-api';
import { useNavigate } from "react-router-dom";

const SectionLab = styled.div`
  width: 100%;
  background-color: #fff;
  font-family: "Montserrat", sans-serif;
  display: flex;
  gap: 100px;
  justify-content: center;
  padding: 50px 0px;
  min-height: 100vh;
`;

const List = styled.div`
  width: 350px;
  padding: 20px;
  background-color: #BECBEE;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ListSubject = styled.div`
  width: 500px;
  height: 100%;
  max-height: 30px;
  padding: 15px 25px;
  background-color: #fff;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const BigList = styled.div`
  width: 100%;
  max-width: 700px;
  padding: 40px;
  background-color: #E6F4CF;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const Text = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  margin: 0; 
  text-align: center;
  color: #000;
`;

const TextDiscipline = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  margin: 0;
  text-align: center;
  color: #000;
`;

const InfoText = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  color: #000;
`;

const RowBlocks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

export default function PersonalStud() {
  const navigate = useNavigate();

  const [studentInfo, setStudentInfo] = useState({
    username: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    password: "",
    roleType: "",
    studyGroup: "",
    form_education: "",
    faculty: "",
  });

  const [subjectsInfo, setSubjectsInfo] = useState([]);

  useEffect(() => {
    getUserData()
      .then(res => {
        setStudentInfo(res.data);
      })
      .catch(error => {
        console.error(error.message);
      });

    getSubjects()
      .then(res => {
        setSubjectsInfo(res.data);
      })
      .catch(error => {
        console.error(error.message);
      });
  }, []);

  return (
    <SectionLab>
      <RowBlocks>
        <List>
          <Text>ФИО студента:</Text>
          <InfoText>{studentInfo.last_name} {studentInfo.first_name} {studentInfo.middle_name}</InfoText>
        </List>
        <List>
          <Text>Номер группы:</Text>
          <InfoText>{studentInfo.studyGroup}</InfoText>
        </List>
        <List>
          <Text>Форма обучения:</Text>
          <InfoText>{studentInfo.form_education}</InfoText>
        </List>
        <List>
          <Text>Направление обучения:</Text>
          <InfoText>{studentInfo.faculty}</InfoText>
        </List>
      </RowBlocks>
      <RowBlocks>
        <BigList>
          <Text>Дисциплины:</Text>
          {subjectsInfo.map((item) => (
            <ListSubject
              key={item.id}
              onClick={() => {
                localStorage.setItem('subject', item.id);
                localStorage.setItem('subjectName', item.name);
                navigate('/disciplinesStud');
              }}
            >
              <TextDiscipline>{item.name}</TextDiscipline>
            </ListSubject>
          ))}
        </BigList>
      </RowBlocks>
    </SectionLab>
  );
}