import React from "react";
import styled from "styled-components";

const Section = styled.div`
  font-family: "Montserrat", sans-serif;
  background-color: #c8d5f6;
  width: 100%;    
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  flex-shrink: 0; /* Предотвращает сжатие футера */
  height: 60px; /* Фиксированная высота для футера */
`;

const Footer = () => {
  return (
    <Section>
      <p>© 2025 Все права защищены</p>
    </Section>
  );
};

export default Footer;