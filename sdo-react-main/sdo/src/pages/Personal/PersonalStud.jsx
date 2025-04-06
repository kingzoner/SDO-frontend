import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { getUserData } from '../../api/user-api';
import { getSubjects } from '../../api/subjects-api';
import { useNavigate } from "react-router-dom";

// Main section with increased gap between student info and disciplines
const SectionLab = styled.div`
  display: flex;
  gap: 80px; /* Increased from 40px to 80px to add more space between student info and disciplines */
  justify-content: center;
  padding: 50px 20px;
  min-height: 100vh;
  background-color: #f9f9f9;
`;

// Smaller info blocks with reduced padding and width
const List = styled.div`
  width: 280px;
  padding: 20px;
  background-color: #D5DEF6;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

// Subject list items with reduced padding and width
const ListSubject = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 15px 25px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f5f5f5;
  }
`;

// Container for subjects with reduced padding and gap
const BigList = styled.div`
  width: 100%;
  max-width: 700px;
  padding: 40px;
  background-color: #E2EDD0;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
`;

// Text styling with slightly smaller font
const Text = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: #333;
`;

// Reduced gap between blocks in the column
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
          <Text>{studentInfo.first_name} {studentInfo.last_name} {studentInfo.middle_name}</Text>
        </List>
        <List>
          <Text>Номер группы:</Text>
          <Text>{studentInfo.studyGroup}</Text>
        </List>
        <List>
          <Text>Форма обучения:</Text>
          <Text>{studentInfo.form_education}</Text>
        </List>
        <List>
          <Text>Направление обучения:</Text>
          <Text>{studentInfo.faculty}</Text>
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
              <Text>{item.name}</Text>
            </ListSubject>
          ))}
        </BigList>
      </RowBlocks>
    </SectionLab>
  );
}