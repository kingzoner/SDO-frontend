import React from "react";
import "./style.css";
import styled from "styled-components";

const InputOutputTask = styled.div`
  margin: 20px;
  font-family: "Montserrat";
`;

const UpperText = styled.p`
  font-weight: bold;
  margin: 0;
`;

const LowerText = styled.p`
  margin: 0;
`;

const MyComponent = ({ upperText, lowerText }) => {
  return (
    <InputOutputTask>
      <UpperText>{upperText}</UpperText>

      <LowerText>{lowerText}</LowerText>
    </InputOutputTask>
  );
};

export default MyComponent;
