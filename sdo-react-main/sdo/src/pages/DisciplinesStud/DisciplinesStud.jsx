import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LabItem from "./components/LabItem";
import { getTasks } from '../../api/subjects-api';

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

/* Заголовок дисциплины */
const Title = styled.p`
  font-size: 20px;
  color: #000;
  margin-bottom: 25px;
`;

const TitleSection = styled.section`
    display: inline-block;
    background-color: #DDE5F8;
    border-radius: 8px;
    padding: 0px 20px;
    margin-bottom: 20px;
`;

/* Основной зелёный блок, внутри которого блоки статистики и список лаб */
const GreenSection = styled.section`
    width: 1000px;
    background-color: #E6F4CF;
    border-radius: 8px;
    padding: 30px;
`;

/* Заголовок "Статистика по выполненным заданиям" */
const StatsTitle = styled.p`
    text-align: center;
    font-size: 18px;
    color: #000;
    margin-bottom: 20px;
    margin-top: -10px;
`;

/* Контейнер для 3-х "карточек" статистики */
const StatsRow = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 30px;
`;

/* Каждая отдельная "карточка" в блоке статистики */
const StatBox = styled.div`
  background-color: #fff;
  border-radius: 6px;
  padding: 30px 20px;
  color: #000;
  min-width: 250px;
  text-align: center;
`;

/* Контейнер для списка лабораторных */
const LabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  gap: 20px;
`;

export default function DisciplinesStud() {
    const [labsInfo, setlabsInfo] = useState([]);
  
    useEffect(() => {
      getTasks()
        .then(res => {
          setlabsInfo(res.data);
        })
        .catch(error => {
            console.error(error.message);
        });
    }, []);

    return (
      <PageContainer>
        <ContentWrapper>
            <TitleSection>
                <Title>Дисциплина: Программирование на языке C++</Title>
            </TitleSection>
          <GreenSection>
            <StatsTitle>Статистика по выполненным заданиям</StatsTitle>
            <StatsRow>
              <StatBox>Сдано: 5 из 10</StatBox>
              <StatBox>Оценено: 3 из 10</StatBox>
              <StatBox>Текущая оценка: 87%</StatBox>
            </StatsRow>
            <LabsContainer>
              {labsInfo.map((lab) => (
                <LabItem key={lab.id} name={lab.name} grade={lab.status} />
              ))}
            </LabsContainer>
          </GreenSection>
        </ContentWrapper>
      </PageContainer>
    );
  }
