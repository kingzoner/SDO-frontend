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
  box-sizing: border-box;

  @media (max-width: 1024px) {
    gap: 80px;
    padding: 45px 20px;
  }

  @media (max-width: 900px) {
    gap: 60px;
    padding: 40px 20px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 40px;
    padding: 40px 16px 80px;
  }

  @media (max-width: 570px) {
    gap: 36px;
    padding: 36px 16px 70px;
  }

  @media (max-width: 480px) {
    gap: 32px;
    padding: 32px 16px 60px;
  }
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
  box-sizing: border-box;

  @media (max-width: 1024px) {
    width: 320px;
    padding: 18px;
  }

  @media (max-width: 900px) {
    width: 300px;
    padding: 18px;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 500px;
    padding: 18px;
  }

  @media (max-width: 570px) {
    max-width: 100%;
    padding: 17px;
  }

  @media (max-width: 480px) {
    max-width: 100%;
    padding: 16px;
  }
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
  box-sizing: border-box;
  margin-bottom: 10px;

  &:hover {
    background-color: #f0f0f0;
  }

  @media (max-width: 1024px) {
    width: 100%;
    max-width: 450px;
    padding: 14px 22px;
  }

  @media (max-width: 900px) {
    max-width: 400px;
    padding: 13px 20px;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    height: auto;
    min-height: 40px;
    padding: 12px 20px;
  }

  @media (max-width: 570px) {
    padding: 11px 18px;
    min-height: 38px;
  }

  @media (max-width: 480px) {
    padding: 10px 16px;
    min-height: 36px;
  }
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
  box-sizing: border-box;

  @media (max-width: 1024px) {
    max-width: 650px;
    padding: 35px 30px;
    gap: 28px;
  }

  @media (max-width: 900px) {
    max-width: 550px;
    padding: 32px 25px;
    gap: 26px;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 500px;
    padding: 30px 20px;
    gap: 24px;
  }

  @media (max-width: 570px) {
    max-width: 100%;
    padding: 27px 18px;
    gap: 22px;
  }

  @media (max-width: 480px) {
    max-width: 100%;
    padding: 24px 16px;
    gap: 20px;
  }
`;

const Text = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  margin: 0; 
  text-align: center;
  color: #000;

  @media (max-width: 1024px) {
    font-size: 17px;
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 570px) {
    font-size: 15.5px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

const TextDiscipline = styled.p`
  font-family: 'Montserrat', sans-serif;
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

const InfoText = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  color: #000;

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
  align-items: center;
  gap: 30px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    gap: 28px;
  }

  @media (max-width: 900px) {
    gap: 26px;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 500px;
    gap: 24px;
  }

  @media (max-width: 570px) {
    max-width: 100%;
    gap: 22px;
  }

  @media (max-width: 480px) {
    max-width: 100%;
    gap: 20px;
  }
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