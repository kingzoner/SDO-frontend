import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import FileUploader from './FileUploader';
import { uploadByTaskId, testingTask, getTaskById } from '../../api/file-api';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  font-family: "Montserrat", sans-serif;
  align-items: center;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TitleText = styled.p`
  font-size: 20px;
  text-align: left;
`;

const StatusMarker = styled.div`
  padding: 5px 10px;
  border-radius: 5px;
  background-color: ${({ status }) => (status === 'Success' ? '#4CAF50' : '#F44336')};
  color: white;
  font-size: 14px;
  font-weight: 600;
`;

const BlockTest = styled.div`
  width: 100%;
  background-color: #F0F0F0;
  border-radius: 7px;
  padding: 15px;
`;

const BlockDescription = styled.div`
  width: 100%;
  background-color: #E0E0E0;
  border-radius: 7px;
  padding: 15px;
`;

const BlockTask = styled.div`
  width: 100%;
  background-color: #D9D9D9;
  padding: 10px;
  border-radius: 7px;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 18px;
  margin-left: 10px;
`;

const Text = styled.p`
  font-size: 16px;
  line-height: 1.5;
  margin-left: 10px;
`;

const SolutionContainer = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: #FFFFFF;
  border-radius: 7px;
`;

const SolutionCode = styled.pre`
  font-size: 14px;
  background-color: #F0F0F0;
  padding: 10px;
  border-radius: 5px;
  white-space: pre-wrap;
`;

const ToggleButton = styled.button`
  background-color: #FFFFFF;
  border: none;
  padding: 5px 10px;
  font-family: "Montserrat";
  font-size: 14px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #E0E0E0;
  }
`;

const Button = styled.button`
  padding: 10px;
  width: 100%;
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
  justify-content: space-between;
  gap: 20px;
  width: 100%;
`;

const UploadTitle = styled.div`
  background-color: #D9D9D9;
  padding: 10px;
  margin: 0;
`;

const UploadContainer = styled.div`
  background-color: #FFFFFF;
  padding: 15px;
  border-radius: 0 0 7px 7px;
`;

const FileText = styled.h1`
  font-size: 16px;
  padding: 0;
`;

const Notification = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 15px;
  background-color: ${({ success }) => (success ? '#4CAF50' : '#F44336')};
  color: white;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  font-family: "Montserrat";
  font-size: 16px;
  max-width: 300px;
  z-index: 1000;
  opacity: 0;
  transform: translateY(20px);
  animation: ${({ isExiting }) => (isExiting ? 'fadeOut' : 'fadeIn')} 0.3s ease forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeOut {
    to {
      opacity: 0;
      transform: translateY(20px);
    }
  }
`;

const ErrorNotification = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  padding: 15px;
  background-color: #F44336;
  color: white;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  font-family: "Montserrat";
  font-size: 14px;
  max-width: 400px;
  z-index: 1000;
  opacity: 0;
  transform: translateY(20px);
  animation: ${({ isExiting }) => (isExiting ? 'fadeOut' : 'fadeIn')} 0.3s ease forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeOut {
    to {
      opacity: 0;
      transform: translateY(20px);
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #F44336;
  font-size: 16px;
  cursor: pointer;
  padding: 5px;
  display: inline-flex;
  align-items: center;

  &:hover {
    color: #D32F2F;
  }
`;

const SolutionItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #E0E0E0;
  &:last-child {
    border-bottom: none;
  }
`;

const SolutionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SolutionTitle = styled.h2`
  font-size: 16px;
  font-family: "Montserrat";
  margin: 0;
`;

const LabaStud = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [file, setFile] = useState(null);
  const [showSolutions, setShowSolutions] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isNotificationExiting, setIsNotificationExiting] = useState(false);
  const [errorNotification, setErrorNotification] = useState(null);
  const [isErrorNotificationExiting, setIsErrorNotificationExiting] = useState(false);

  useEffect(() => {
    console.log('Загрузка задачи с ID:', taskId);
    getTaskById(taskId)
      .then((res) => {
        setTask(res.data);
      })
      .catch((error) => {
        console.error('Ошибка загрузки задачи:', error.message);
      });
  }, [taskId]);

  const showNotification = (success, message) => {
    if (notification) {
      setIsNotificationExiting(true);
      setTimeout(() => {
        setNotification({ success, message });
        setIsNotificationExiting(false);
      }, 300);
    } else {
      setNotification({ success, message });
      setIsNotificationExiting(false);
    }
    setTimeout(() => {
      setIsNotificationExiting(true);
      setTimeout(() => setNotification(null), 300);
    }, 5000);
  };

  const showErrorNotification = (message) => {
    if (errorNotification) {
      setIsErrorNotificationExiting(true);
      setTimeout(() => {
        setErrorNotification({ message });
        setIsErrorNotificationExiting(false);
      }, 300);
    } else {
      setErrorNotification({ message });
      setIsErrorNotificationExiting(false);
    }
  };

  const closeErrorNotification = () => {
    setIsErrorNotificationExiting(true);
    setTimeout(() => setErrorNotification(null), 300);
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      uploadByTaskId(taskId, formData)
        .then(() => {
          showNotification(true, 'Файл успешно загружен!');
          getTaskById(taskId).then((res) => setTask(res.data));
        })
        .catch((error) => {
          showNotification(false, 'Ошибка при загрузке файла!');
          console.error('Ошибка при загрузке файла:', error);
        });
    } else {
      alert('Пожалуйста, выберите файл для загрузки.');
    }
  };

  const handleTest = async () => {
    testingTask(taskId)
      .then((res) => {
        const testResult = res.data;
        showNotification(
          testResult.status === 'Success',
          testResult.status === 'Success'
            ? 'Тестирование успешно!'
            : 'Тестирование завершено с ошибкой'
        );
        getTaskById(taskId).then((res) => setTask(res.data));
      })
      .catch((error) => {
        const errorData = error.response?.data || {};
        if (errorData.status === 'Failed') {
          showErrorNotification(errorData.code_output);
        }
        showNotification(false, 'Тестирование завершено с ошибкой');
        getTaskById(taskId).then((res) => setTask(res.data));
      });
  };

  const handleDeleteSolution = (index) => {
    setTask((prevTask) => ({
      ...prevTask,
      solutions: prevTask.solutions.filter((_, i) => i !== index),
    }));
    showNotification(true, 'Решение успешно удалено!');
  };

  if (!task) {
    return <Container>Загрузка...</Container>;
  }

  return (
    <Container>
      <HeaderContainer>
        <TitleText>{task.name}</TitleText>
        <StatusMarker status={task.status}>
          {task.status === 'Success' ? 'Сдано' : 'Не сдано'}
        </StatusMarker>
      </HeaderContainer>

      <BlockDescription>
        <Text>{task.description.replace(/\\n/g, '\n')}</Text>
      </BlockDescription>

      <BlockTask>
        {task.solutions.length > 0 && (
          <SolutionContainer>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Title>Ваши решения:</Title>
              <ToggleButton onClick={() => setShowSolutions(!showSolutions)}>
                {showSolutions ? 'Скрыть' : 'Показать'}
              </ToggleButton>
            </div>
            {showSolutions && task.solutions.map((solution, index) => (
              <SolutionItem key={index}>
                <SolutionHeader>
                  <SolutionTitle>Решение {index + 1}</SolutionTitle>
                  <DeleteButton onClick={() => handleDeleteSolution(index)}>
                    ✕
                  </DeleteButton>
                </SolutionHeader>
                <SolutionCode>{solution.code}</SolutionCode>
                <Text><strong>Статус решения:</strong> {solution.status}</Text>
              </SolutionItem>
            ))}
          </SolutionContainer>
        )}

        <UploadTitle>
          <FileText>Ответ в виде файла:</FileText>
        </UploadTitle>
        <UploadContainer>
          <FileUploader file={file} setFile={setFile} />
        </UploadContainer>
      </BlockTask>

      <ButtonContainer>
        <Button onClick={handleUpload}>Загрузить</Button>
        <Button onClick={handleTest}>Тестировать</Button>
      </ButtonContainer>

      {notification && (
        <Notification
          success={notification.success}
          isExiting={isNotificationExiting}
        >
          {notification.message}
        </Notification>
      )}

      {errorNotification && (
        <ErrorNotification isExiting={isErrorNotificationExiting}>
          {errorNotification.message}
          <CloseButton onClick={closeErrorNotification}>✖</CloseButton>
        </ErrorNotification>
      )}
    </Container>
  );
};

export default LabaStud;