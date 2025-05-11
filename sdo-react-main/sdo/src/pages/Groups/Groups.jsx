import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStudentsByGroup } from "../../api/teacher-api";

const StudentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const GroupHeader = styled.div`
  width: 1480px;
  font-family: "Montserrat";
  font-size: 24px;
  font-weight: bold;
  padding: 15px 20px;
  border-radius: 7px;
  margin-bottom: 20px;
  color: #333;
`;

const StudentList = styled.ul`
  width: 1480px;
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StudentItem = styled.li`
  background-color: #e6f4cf;
  font-family: "Montserrat";
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.3s;
  border-radius: 7px;
`;

const StudentInfo = styled.div`
  display: flex;
  align-items: center;
`;

const StudentName = styled.div`
  font-weight: normal;
  font-size: 20px;
  margin-right: 20px;
`;

const ViewButton = styled.button`
  font-weight: normal;
  font-size: 18px;
  background-color: #becbee;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  height: 42px;
  padding: 0 15px;

  &:hover {
    background-color: #0056b3;
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
  height: 100%;
  max-height: 30px;
`;

const StudentsByGroup = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [students, setStudents] = useState({ isLoading: true, data: [] });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getStudentsByGroup(groupId);
        setStudents({ isLoading: false, data: response.data });
      } catch (error) {
        console.error("Failed to fetch students:", error);
        setStudents({ isLoading: false, data: [] });
      }
    };

    fetchStudents();
  }, [groupId]);

  const groupName = students.data.length > 0 ? students.data[0].studyGroup : "";
  const handleViewStudent = (id) => navigate(`/student/${id}`);

  return (
    <StudentsContainer>
      {!students.isLoading && students.data.length > 0 && (
        <GroupHeader>Студенты группы {groupName}</GroupHeader>
      )}
      <StudentList>
        {students.isLoading ? (
          <TextStyle>Загрузка студентов...</TextStyle>
        ) : students.data.length === 0 ? (
          <TextStyle>Студенты не найдены</TextStyle>
        ) : (
          students.data.map((student) => (
            <StudentItem key={student.id}>
              <StudentInfo>
                <StudentName>{student.full_name}</StudentName>
              </StudentInfo>
              <ViewButton onClick={() => handleViewStudent(student.id)}>
                Просмотреть
              </ViewButton>
            </StudentItem>
          ))
        )}
      </StudentList>
    </StudentsContainer>
  );
};

export default StudentsByGroup;