import React from 'react';
import styled from 'styled-components';

const ListContainer = styled.div`
  background-color: #BECBEE;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const AttemptsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AttemptRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
`;

const AttemptName = styled.div`
  margin-left: 30px;
  font-weight: 500;
`;

const AttemptResult = styled.div`
  margin-right: 50px;
  font-weight: 500;
`;

const AttemptsList = () => {
  const attempts = [
    { label: 'Попытка 1', result: 'OK' },
    { label: 'Попытка 2', result: 'WA' },
  ];

  return (
    <ListContainer>
      <AttemptsWrapper>
        {attempts.map((attempt, idx) => (
          <AttemptRow key={idx} index={idx}>
            <AttemptName>{attempt.label}</AttemptName>
            <AttemptResult>{attempt.result}</AttemptResult>
          </AttemptRow>
        ))}
      </AttemptsWrapper>
    </ListContainer>
  );
};

export default AttemptsList;
