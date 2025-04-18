import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  /* ограничиваем ширину и центрируем по горизонтали */
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  /* вертикальное и горизонтальное центрирование */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 250px);

  padding: 40px 20px;
  box-sizing: border-box;
`;

const Hero = styled.div`
  font-family: "Montserrat", sans-serif;
  max-width: 960px;
  text-align: center;

  h1 {
    font-size: 42px;
    font-weight: 700;
    color: #000;
    margin-bottom: 20px;
  }

  p {
    font-size: 20px;
    line-height: 32px;
    color: #000;
  }
`;

const MainPage = () => (
  <Wrapper>
    <Hero>
      <h1>Добро пожаловать на портал лабораторных работ</h1>
      <p>
        Здесь вы сможете проходить и проверять лабораторные работы,
        просматривать результаты и вести историю своего обучения.
      </p>
    </Hero>
  </Wrapper>
);

export default MainPage;
