import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import FileUploader from './FileUploader';
import base64 from 'base-64';
import { uploadByTaskId, testingTask } from '../../api/file-api';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  font-family: "Montserrat", sans-serif;
  align-items: center;
`;

const BlockTest = styled.div`
  width: 1248px;
  background-color: #F0F0F0;
  border-radius: 7px;
`;

const BlockTask = styled.div`
  width: 1248px;
  background-color: ${({ isOpen }) => (isOpen ? '#D9D9D9' : 'transparent')}; // Only gray background when open
  padding: 10px;
  border-radius: 7px;
  margin-top: 5px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
`;

const TaskHeader = styled.div`
  padding: 10px;
  background-color: ${({ isOpen }) => (isOpen ? '#D9D9D9' : '#F0F0F0')};
  border-radius: 7px 7px 0 0;
  cursor: pointer;
`;

const TitleText = styled.p`
  font-size: 20px;
  text-align: left;
  width: 1250px;
  margin-left: 10px;
`;

const Title = styled.h1`
  font-size: 18px;
  margin-left: 10px;
`;

const Text = styled.p`
  font-size: 16px;
  line-height: 1.5;
`;

const Button = styled.button`
  padding: 10px;
  width: 525px; 
  height: 91px; 
  background-color: #fff;
  border-style: none;
  border-radius: 7px;
  font-family: "Montserrat";
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;

  &:hover {
    background: #D9D9D9;
    color: #000;
    transition: 0.3s;
  }
`;

const ButtonContainer = styled.div`
  display: flex; 
  justify-content: center; 
  gap: 20px; 
`;

const ToggleContent = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  background: #;
  padding: 15px;
  border-radius: 7px;
`;

const UploadTitle = styled.div`
  background-color: #D9D9D9;
  padding: 10px;
  margin: -10px -15px 0 -15px;
`;

const UploadContainer = styled.div`
  background-color: #FFFFFF;
  padding: 15px;
  border-radius: 0 0 7px 7px;
`;

const FileText = styled.h1`
  font-size: 16px;
  padding: 10px;
`;

const LabaStud = () => {
  const [fileTask1, setFileTask1] = useState(null);
  const [fileTask2, setFileTask2] = useState(null);
  const [fileTask3, setFileTask3] = useState(null);
  const [openTask1, setOpenTask1] = useState(false);
  const [openTask2, setOpenTask2] = useState(false);
  const [openTask3, setOpenTask3] = useState(false);
  const { id } = useParams();

  const handleSubmit = async () => {
    if (fileTask1 || fileTask2 || fileTask3) {
      const handleFileSubmit = async (file, taskId) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => {
          const encodedFile = base64.encode(
            String.fromCharCode(...new Uint8Array(reader.result))
          );
          uploadByTaskId(taskId, encodedFile)
            .then(() => {
                testingTask(taskId);
              })
            .catch((error) => {
              console.error('Ошибка:', error);
            });
        };
      };
      if (fileTask1) await handleFileSubmit(fileTask1, 1);
      if (fileTask2) await handleFileSubmit(fileTask2, 2);
      if (fileTask3) await handleFileSubmit(fileTask3, 3);
    } else {
      alert('Пожалуйста, выберите файл для загрузки.');
    }
  };

  const handleSaveDraft = () => {
    alert('Черновик сохранен!');
  };

  return (
    <Container>
      <TitleText>Лабораторная работа №{id}: “Наибольшее из трех чисел”</TitleText>
      <BlockTest>
        <Title>Типы тестов, используемые в данной лабораторной работе:</Title>
        <ul>
          <li>Проверка формулы</li>
          <br />
          <li>Автотесты</li>
          <br />
          <li>Проверка скорости выполнения</li>
          <br />
          <li>Проверка чего-нибудь еще</li>
        </ul>
      </BlockTest>

      <BlockTask isOpen={openTask1}>
        <TaskHeader onClick={() => setOpenTask1(!openTask1)} isOpen={openTask1}>
          <FileText>Задача №1</FileText>
        </TaskHeader>
        <ToggleContent isOpen={openTask1}>
          <Text>
            Даны три целых числа. Найдите наибольшее из них (программа должна вывести ровно одно целое число).
            <br />Под наибольшим в этой задаче понимается число, которое не меньше, чем любое другое.
          </Text>
          <Text>
            <strong>Формат входных данных:</strong> Вводятся три числа.
          </Text>
          <Text>
            <strong>Формат выходных данных:</strong> Выведите ответ на задачу.
          </Text>
          <Text>
            <strong>Sample Input:</strong>
          </Text>
          <Text>1<br />2<br />3</Text>
          <Text>
            <strong>Sample Output:</strong>
          </Text>
          <Text>3</Text>
          <UploadTitle>
            <FileText>Ответ в виде файла:</FileText>
          </UploadTitle>
          <UploadContainer>
            <FileUploader file={fileTask1} setFile={setFileTask1} />
          </UploadContainer>
        </ToggleContent>
      </BlockTask>

      <BlockTask isOpen={openTask2}>
        <TaskHeader onClick={() => setOpenTask2(!openTask2)} isOpen={openTask2}>
          <FileText>Задача №2</FileText>
        </TaskHeader>
        <ToggleContent isOpen={openTask2}>
          <Text>
            <strong>Формат входных данных:</strong> ...
          </Text>
          <Text>
            <strong>Формат выходных данных:</strong> ...
          </Text>
          <Text>
            <strong>Sample Input:</strong>
          </Text>
          <Text>...</Text>
          <Text>
            <strong>Sample Output:</strong>
          </Text>
          <Text>...</Text>
          <UploadTitle>
            <FileText>Ответ в виде файла:</FileText>
          </UploadTitle>
          <UploadContainer>
            <FileUploader file={fileTask2} setFile={setFileTask2} />
          </UploadContainer>
        </ToggleContent>
      </BlockTask>

      <BlockTask isOpen={openTask3}>
        <TaskHeader onClick={() => setOpenTask3(!openTask3)} isOpen={openTask3}>
          <FileText>Задача №3</FileText>
        </TaskHeader>
        <ToggleContent isOpen={openTask3}>
          <Text>
            <strong>Формат входных данных:</strong> ...
          </Text>
          <Text>
            <strong>Формат выходных данных:</strong> ...
          </Text>
          <Text>
            <strong>Sample Input:</strong>
          </Text>
          <Text>...</Text>
          <Text>
            <strong>Sample Output:</strong>
          </Text>
          <Text>...</Text>
          <UploadTitle>
            <FileText>Ответ в виде файла:</FileText>
          </UploadTitle>
          <UploadContainer>
            <FileUploader file={fileTask3} setFile={setFileTask3} />
          </UploadContainer>
        </ToggleContent>
      </BlockTask>

      <ButtonContainer>
          <Button onClick={handleSubmit}>Отправить на проверку</Button>
          <Button onClick={handleSaveDraft}>Сохранить черновик</Button>
      </ButtonContainer>
    </Container>
  );
};

export default LabaStud;

