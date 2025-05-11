import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { getStudentById } from '../../api/user-api';
import { getSubjects } from '../../api/subjects-api';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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
  background-color: ${props => props.$isCompleted ? "#4CAF50" : "#fff"};
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: #E6F4CF;
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

export default function StudentPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [studentInfo, setStudentInfo] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        group: "",
        form_education: ""
    });

    const [subjectsInfo, setSubjectsInfo] = useState([]);
    const [labs, setLabs] = useState([]);
    const [error, setError] = useState("");

    const token = localStorage.getItem("access_token");

    useEffect(() => {
        getStudentById(id)
            .then(res => {
                setStudentInfo(res.data);
            })
            .catch(error => {
                console.error("Ошибка при получении студента:", error.message);
            });

        getSubjects()
            .then(res => {
                setSubjectsInfo(res.data);
            })
            .catch(error => {
                console.error(error.message);
            });

        // Загрузка списка лаб
        const fetchLabs = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/teachers/students/${id}/labs`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                    }
                );
                setLabs(response.data || []);
            } catch (error) {
                console.error("Ошибка при загрузке лабораторных работ:", error);
                setError("Не удалось загрузить список лабораторных работ");
            }
        };

        if (id) {
            fetchLabs();
        }
    }, [id, token]);

    const handleLabClick = (labId, labName) => {
        localStorage.setItem("labId", labId);
        localStorage.setItem("labName", labName);
        navigate(`/lab/${labId}`);
    };

    return (
        <SectionLab>
            <RowBlocks>
                <List>
                    <Text>ФИО студента:</Text>
                    <InfoText>
                        {studentInfo.last_name} {studentInfo.first_name} {studentInfo.middle_name}
                    </InfoText>
                </List>
                <List>
                    <Text>Номер группы:</Text>
                    <InfoText>{studentInfo.study_group || "-"}</InfoText>
                </List>
                <List>
                    <Text>Форма обучения:</Text>
                    <InfoText>{studentInfo.form_education || "-"}</InfoText>
                </List>
                <List>
                    <Text>Направление обучения:</Text>
                    <InfoText>{studentInfo.faculty || "-"}</InfoText>
                </List>
            </RowBlocks>
            <RowBlocks>
                <BigList>
                    <Text>Список лабораторных работ студента:</Text>
                    {labs.map(([labId, labName, isCompleted]) => (
                        <ListSubject style={{ color: "black" }}
                            key={labId}
                            $isCompleted={isCompleted}
                            onClick={() => handleLabClick(labId, labName)}
                        >
                            <TextDiscipline>{labName}</TextDiscipline>
                        </ListSubject>
                    ))}
                    {error && <Text style={{ color: "red" }}>{error}</Text>}
                </BigList>
            </RowBlocks>
        </SectionLab>
    );
}