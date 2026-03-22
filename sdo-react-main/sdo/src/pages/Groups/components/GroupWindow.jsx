import React from "react";

import styled from "styled-components";

const StyledContainer = styled.div`
  background-color: #e6f4cf;

  font-family: "Montserrat";

  width: 1480px;

  height: 100px;

  padding: 0 20px;

  display: flex;

  align-items: center;

  justify-content: space-between;

  margin: 30px auto;

  transition: background-color 0.3s;

  border-radius: 7px;
`;

const GroupContent = styled.div`
  display: flex;

  align-items: center;
`;

const GroupNumber = styled.div`
  font-weight: normal;

  font-size: 20px;

  margin-right: 10px;
`;

const ChangeButton = styled.button`
  font-weight: normal;

  font-size: 16px;

  background-color: #D9D9D9;

  color: white;

  border: none;

  font-family: "Montserrat";

  border-radius: 5px;

  cursor: pointer;

  height: 42px;

  padding: 0 15px;

  &:hover {
    background-color: #BECBEE;
  }
`;

const GroupWindow = ({ groupNumber }) => {
  const handleButtonClick = () => {
    console.log(`Переход к группе: ${groupNumber}`);
  };

  return (
    <StyledContainer>
      <GroupContent>
        <GroupNumber>{groupNumber}</GroupNumber>
      </GroupContent>

      <ChangeButton onClick={handleButtonClick}>Перейти к группе</ChangeButton>
    </StyledContainer>
  );
};

export default GroupWindow;
