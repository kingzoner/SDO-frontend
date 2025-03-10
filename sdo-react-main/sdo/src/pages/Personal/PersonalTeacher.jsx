import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUsername } from "../Auto/Slice/authSlice";
const SectionLab = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  padding: 75px 0px 100px;
`;

const List = styled.li`
  width: 320px;
  height: auto;
  background-color: #becbee;
  border-radius: 7px;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 10px 20px;
  gap: 5px;
`;

const BigList = styled.li`
  width: ${({ $Block }) => ($Block ? "673px" : "673px")};
  height: ${({ $Block }) => ($Block ? "68px" : "68px")};
  background-color: #e2edd0;
  border-radius: 7px;
  display: flex;
  align-items: center;
  list-style-type: none;
  justify-content: space-between;
  padding: 0 20px;
  margin-left: 50px;
`;

const BigListText = styled.h1`
  font-family: "Montserrat";
  font-size: 18px;
  color: #000;
  text-align: left;
`;

const Text = styled.p`
  font-family: "Montserrat";
  font-size: 16px;
  margin: 0 0 10px;
`;

const TextMain = styled.h1`
  font-family: "Montserrat";
  font-size: 16px;
  margin: 0 0 10px;
  font-weight: 600;
`;

const RowBlocks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 0px 0px 20px;
`;

const Button = styled.div`
  width: 125px;
  height: 40px;
  background-color: #c8d5f6;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto; /* Прижимает кнопку вправо */
  .button__link {
    color: white;
    text-decoration: none;
    font-family: "Montserrat";
    font-size: 16px;
  }
`;

const PersonalTeacher = () => {
  //const username = useSelector(state => state.auth.username);

  return (
    <SectionLab>
      <RowBlocks>
        <List>
          <Text>ФИО преподавателя:</Text>
          <TextMain>Артемов Артем Артемович</TextMain>
        </List>
        <List>
          <Text>Преподаваемая дисциплина:</Text>
          <TextMain>Информационные технологии</TextMain>
        </List>
        <List>
          <Text>Группы:</Text>
          <TextMain>218-221, 218-222, 221-734, 221-735</TextMain>
        </List>
      </RowBlocks>
      <RowBlocks>
        <BigList>
          <BigListText>Дисциплины</BigListText>
          <Button>
            <Link to="/Disciplines" className="button__link">
              Перейти
            </Link>
          </Button>
        </BigList>
        <BigList>
          <BigListText>Список лабораторных работ</BigListText>
          <Button>
            <Link to="/Laboratory" className="button__link">
              Перейти
            </Link>
          </Button>
        </BigList>
        <BigList>
          <BigListText>Список обучающихся студентов</BigListText>
          <Button>
            <Link to="/groups" className="button__link">
              Перейти
            </Link>
          </Button>
        </BigList>
      </RowBlocks>
    </SectionLab>
  );
};

export default PersonalTeacher;
