import React, { useState } from "react";
import styled from "styled-components";
import LabWorkItem from "./LabWorkItem";

const StyledContainer = styled.div`
  background-color: #eff5e5;
  font-family: "Montserrat";
  width: 1480px;
  padding: 0px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  transition: background-color 0.3s;
  background-color: ${({ allPassed }) => (allPassed ? "#EFF5E5" : "#F9DFDF")};
`;

const StudentName = styled.div`
  font-weight: normal;
  font-size: 20px;
`;

const LabWorkContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ChangeButton = styled.button`
  margin-left: 10px;
  font-weight: normal;
  font-size: 20px;
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

const StudentLabs = ({ studentName, labWorks }) => {
  const [scores, setScores] = useState(labWorks.map((work) => work.score));

  const handleChangeScore = (index) => {
    const newScore = prompt("Введите новую оценку:", scores[index]);

    if (newScore !== null) {
      const updatedScores = [...scores];
      updatedScores[index] = parseInt(newScore, 10);
      setScores(updatedScores);
    }
  };

  // Проверяем, все ли работы сданы
  const allPassed = labWorks.every((work) => work?.passed);

  return (
    <StyledContainer allPassed={allPassed}>
      <StudentName>{studentName}</StudentName>

      <LabWorkContainer>
        {labWorks.map((work, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "20px",
            }}
          >
            {work.passed !== undefined ? (
              <>
                <LabWorkItem score={scores[index]} passed={work.passed} />
                <ChangeButton onClick={() => handleChangeScore(index)}>
                  Изменить оценку
                </ChangeButton>
              </>
            ) : (
              <>
                <ChangeButton disabled>Не оценено</ChangeButton>
                <div style={{ marginLeft: "10px", fontSize: "20px" }}>
                  —
                </div>{" "}
                {/* Прочерк */}
              </>
            )}
          </div>
        ))}
      </LabWorkContainer>
    </StyledContainer>
  );
};

export default StudentLabs;
