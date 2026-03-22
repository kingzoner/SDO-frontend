import React from 'react';
import styled from 'styled-components';

const LabItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px; /* Увеличиваем расстояние между названием и статусом */
  flex: 1;
`;

const LabName = styled.p`
  font-size: 16px;
  color: #000;
  margin: 0;
  flex: 1;
`;

const LabGrade = styled.p`
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: ${({ grade }) => (grade === 'Success' ? '#85A4518C' : '#FF7070')};
  color: white;
  margin: 0;
  font-weight: 600;
`;

const LabItem = ({ name, grade }) => {
  const displayStatus = grade === 'Success' ? 'Сдано' : 'Не сдано';

  return (
    <LabItemContainer>
      <LabName>{name}</LabName>
      <LabGrade grade={grade}>{displayStatus}</LabGrade>
    </LabItemContainer>
  );
};

export default LabItem;