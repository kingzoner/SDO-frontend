import React from "react";

import styled from "styled-components";

import { FaCheck, FaTimes } from "react-icons/fa";

const LabWorkContainer = styled.div`
  border-radius: 5px; /* Сохранен радиус для закругления углов */

  padding: 10px; /* Отступы */

  display: flex; /* Используем flex для расположения элементов */

  align-items: center; /* Центрируем по вертикали */

  justify-content: space-between; /* Распределяем элементы по обе стороны */

  margin: 10px 0; /* Отступы сверху и снизу */
`;

const StatusIndicator = styled.div`
  font-size: 30px; /* Увеличенный размер иконок */

  margin-right: 10px; /* Отступ между индикатором и оценкой */

  color: ${({ passed }) => (passed ? "#21B200" : "#EA9090")}; /* Цвет иконок */
`;

const Grade = styled.span`
  font-size: 18px; /* Размер текста оценки */

  font-weight: bold; /* Жирный шрифт */

  margin: 0 10px; /* Отступы вокруг текста оценки */

  background-color: #d9d9d9; /* Фоновый цвет для оценки */

  padding: 10px 20px; /* Увеличенные отступы внутри элемента оценки */

  border-radius: 5px; /* Закругленные углы фона */

  min-width: 80px; /* Минимальная ширина элемента */

  text-align: center; /* Центрируем текст внутри элемента */

  color: ${({ passed }) =>
    passed ? "#21B200" : "#EA9090"}; /* Цвет текста в зависимости от статуса */
`;

const LabWorkItem = ({ score, passed }) => {
  return (
    <LabWorkContainer>
      <StatusIndicator passed={passed}>
        {passed ? <FaCheck /> : <FaTimes />} {/* Галочка или крестик */}
      </StatusIndicator>
      <Grade passed={passed}>{score}/100</Grade>{" "}
      {/* Отображение оценки в формате X/100 */}
    </LabWorkContainer>
  );
};

export default LabWorkItem;
