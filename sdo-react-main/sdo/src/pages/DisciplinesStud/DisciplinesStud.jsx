import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LabItem from "./components/LabItem";
import { getTasks } from '../../api/subjects-api';
import { useNavigate } from "react-router-dom";

const PageContainer = styled.div`
  background-color: #fff;
  font-family: "Montserrat", sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 20px 60px;
`;

const Title = styled.p`
  font-size: 20px;
  color: #000;
  margin: 0;
`;

const TitleSection = styled.section`
  display: inline-block;
  background-color: #DDE5F8;
  border-radius: 8px;
  padding: 10px 20px;
  margin-bottom: 20px;
`;

const GreenSection = styled.section`
  width: 100%;
  max-width: 1248px;
  background-color: #E6F4CF;
  border-radius: 8px;
  padding: 40px;
`;

const StatsTitle = styled.p`
  text-align: center;
  font-size: 18px;
  color: #000;
  margin-bottom: 30px;
  margin-top: 0;
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  align-items: center;
  margin-bottom: 30px;
`;

const StatBox = styled.div`
  background-color: #fff;
  border-radius: 6px;
  padding: 15px 20px;
  color: #000;
  width: 100%;
  text-align: center;
  font-size: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const LabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  align-items: center;
  gap: 25px;
`;

const LabRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: #fff;
  border-radius: 6px;
  padding: 10px 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer; /* Курсор как у кнопки */
  transition: background-color 0.3s ease; /* Плавный переход для hover */

  &:hover {
    background-color: #f5f5f5; /* Лёгкий серый фон при наведении */
  }
`;

export default function DisciplinesStud() {
  const [labsInfo, setLabsInfo] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [stats, setStats] = useState({
    submitted: 0,
    grade: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const storedSubjectName = localStorage.getItem('subjectName') || "Неизвестная дисциплина";
    setSubjectName(storedSubjectName);

    getTasks(localStorage.getItem('subject'))
      .then(res => {
        const tasks = res.data;
        setLabsInfo(tasks);

        const totalTasks = tasks.length;
        const submitted = tasks.filter(task => task.status === "Success").length;
        const grade = totalTasks > 0 ? Math.round((submitted / totalTasks) * 100) : 0;

        setStats({
          submitted,
          grade,
        });
      })
      .catch(error => {
        console.error(error.message);
      });
  }, []);

  return (
    <PageContainer>
      <ContentWrapper>
        <TitleSection>
          <Title>Дисциплина: {subjectName}</Title>
        </TitleSection>
        <GreenSection>
          <StatsTitle>Статистика по выполненным заданиям</StatsTitle>
          <StatsRow>
            <StatBox>Сдано: {stats.submitted} из {labsInfo.length}</StatBox>
            <StatBox>Текущая оценка: {stats.grade}%</StatBox>
          </StatsRow>
          <LabsContainer>
            {labsInfo.map((lab) => (
              <LabRow
                key={lab.id}
                onClick={() => navigate(`/LabaStud/${lab.id}`)} // Делаем весь блок кликабельным
              >
                <LabItem name={lab.name} grade={lab.status} />
              </LabRow>
            ))}
          </LabsContainer>
        </GreenSection>
      </ContentWrapper>
    </PageContainer>
  );
}