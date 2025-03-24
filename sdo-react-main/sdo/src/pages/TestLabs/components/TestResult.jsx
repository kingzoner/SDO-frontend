import React from 'react';
import styled from 'styled-components';

const GridContainer = styled.div`
  background-color: #BECBEE;
  display: flex;
  justify-content: space-between;
  padding: 30px 10px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const Block = styled.div`
  background-color: #fff;
  width: 400px;
  height: 100px;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center
`;

const TestResult = () => {
  const tests = ["Проверка на ...", "Проверка на ...", "Проверка на ..."];
  const measurements = ["5 мс", "100 мс", "1 с"];
  const results = ["OK", "WA", "WA"];

  return (
    <GridContainer>
      {/* Первая колонка: Названия тестов */}
      <Column>
        {tests.map((test, index) => (
          <Block key={index}>
            <text>Тест {index + 1}</text>
            <div>{test}</div>
          </Block>
        ))}
      </Column>
      
      {/* Вторая колонка: Измерения */}
      <Column>
        {measurements.map((measurement, index) => (
          <Block key={index}>
            {measurement}
          </Block>
        ))}
      </Column>
      
      {/* Третья колонка: Результаты */}
      <Column>
        {results.map((result, index) => (
          <Block key={index}>
            {result}
          </Block>
        ))}
      </Column>
    </GridContainer>
  );
};

export default TestResult;
