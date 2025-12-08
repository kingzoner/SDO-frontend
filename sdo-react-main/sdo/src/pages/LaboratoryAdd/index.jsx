import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { createLab, getSubjects } from "../../api/teacher-api";

const Section = styled.form`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 16px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const BigBlock = styled.div`
  width: 100%;
  max-width: 1248px;
  min-height: ${({ $BigHeight }) => ($BigHeight ? "530px" : "auto")};
  background-color: ${({ $BigFon }) => ($BigFon ? "#E2EDD0" : "#D5DEF6")};
  border-radius: 10px;
  display: flex;
  gap: ${({ $GapForm }) => ($GapForm ? "60px" : "16px")};
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;

  .block__test {
    width: 100%;
    max-width: 540px;
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    box-sizing: border-box;
  }
  .block__one {
    margin-top: 5px;
    flex: 1 1 320px;
    min-width: 280px;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 20px;
    min-height: auto;
  }

  @media (max-width: 768px) {
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
    gap: 16px;
  }
`;

const MinBlock = styled.li`
  width: 100%;
  max-width: 592px;
  min-height: 102px;
  height: auto;
  border-radius: 10px;
  background-color: #ffffff;
  padding: 12px;
  list-style-type: none;
  position: relative;
  box-sizing: border-box;

  .icon {
    position: absolute;
    top: 8px;
    right: 12px;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const UlMinBlock = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: ${({ $PaddingTopForm }) => ($PaddingTopForm ? "10px" : "15px")};
  max-height: 420px;
  overflow-y: auto;
  padding-right: 8px;
  margin: 0;

  @media (max-width: 768px) {
    max-height: 360px;
    gap: 16px;
  }

  @media (max-width: 480px) {
    max-height: 320px;
  }
`;

const UlList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
  max-width: 1248px;
  width: 100%;
  margin: 0 auto;
  padding: 0 16px 24px;
  box-sizing: border-box;
  list-style: none;

  .editing__container {
    width: 100%;
    max-width: 608px;
    min-height: 240px;
    background: #e2edd0;
    border-radius: 7px;
    list-style-type: none;
    display: flex;
    align-items: center;
    box-sizing: border-box;
  }
  .editing__block-Two {
    padding: 0px 30px 30px 20px;
    box-sizing: border-box;
  }
  .editing__block-text {
    color: #000;
    font-family: "Montserrat";
    font-size: 16px;
  }
  .editing__block-inp {
    display: flex;
    align-items: center;
  }
  .some-input {
    border: none;
    border-bottom: 1px solid #000;
    background-color: transparent;
    color: inherit;
    outline: none;
    margin-left: 5px;
    font-family: "Montserrat";
    width: 100%;
    max-width: 320px;
  }
  .editing__block-input {
    width: 100%;
    max-width: 555px;
    height: 60px; /* как в PrepodRedLab */
    border-radius: 7px;
    border-style: none;
    color: #000;
    font-family: "Montserrat";
    font-size: 16px;
    line-height: 27px;
    outline: none;
    background: #fff;
    padding: 8px 12px;
    box-sizing: border-box;
  }
  .editing__block-bth {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  .editing__block {
    padding: 0px 30px 0px 20px;
    display: flex;
    gap: 60px;
    align-items: baseline;
    box-sizing: border-box;
  }
  .editing__block-name {
    display: flex;
    align-items: baseline;
    gap: 6px;
    flex-wrap: wrap;
  }
  .block__button {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    max-width: 1248px;
    box-sizing: border-box;
  }
  .block__end {
    display: flex;
    flex-direction: column;
    gap: 5px;
    background-color: #e2edd0;
    border-radius: 5px;
    width: 100%;
    max-width: 1248px;
    min-height: 110px;
    justify-content: center;
    border-style: none;
    align-items: center;
    cursor: pointer;
    box-sizing: border-box;
    padding: 12px;
    &:hover {
      background-color: #d7ebb5eb;
    }
  }
  .block__end-link {
    color: #000;
    font-size: 16px;
    font-family: "Montserrat";
    line-height: 27px;
    text-decoration: none;
    display: flex;
    justify-content: center;
    width: 100%;
  }

  @media (max-width: 900px) {
    gap: 18px;
    padding: 0 12px 20px;

    .editing__block {
      gap: 30px;
      flex-direction: column;
      align-items: flex-start;
    }
    .editing__container {
      height: auto;
      min-height: 220px;
      padding: 12px 0;
    }
  }

  @media (max-width: 768px) {
    .editing__block-Two {
      padding: 0px 18px 20px 14px;
    }
    .editing__block-input {
      font-size: 14px;
      height: 52px;
    }
    .editing__block-text {
      font-size: 14px;
    }
    .block__end {
      min-height: 100px;
    }
  }

  @media (max-width: 570px) {
    .editing__block-bth {
      flex-direction: column;
      align-items: stretch;
    }
    .some-input {
      max-width: 100%;
    }
  }

  @media (max-width: 480px) {
    gap: 14px;
    .block__end-link {
      font-size: 14px;
      line-height: 22px;
    }
  }
`;

const List = styled.li`
  width: 100%;
  max-width: ${({ $Block }) => ($Block ? "1248px" : "608px")};
  min-height: ${({ $Block }) => ($Block ? "59px" : "260px")};
  height: auto;
  background-color: ${({ $Block }) => ($Block ? "#D9D9D9" : "#D5DEF6")};
  border-radius: 7px;
  display: flex;
  align-items: center;
  list-style-type: none;
  box-sizing: border-box;
  padding: 8px 0;

  @media (max-width: 900px) {
    max-width: 100%;
  }
`;

const NameLabInput = styled.input`
  display: flex;
  border: none;
  background: none;
  width: 100%;
  max-width: 608px;
  min-height: 120px;
  height: auto;
  font-size: 18px;
  padding: 10px 12px 10px 18px;
  outline: none;
  box-sizing: border-box;

  @media (max-width: 768px) {
    font-size: 16px;
    min-height: 100px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
    min-height: 90px;
  }
`;

const TitleBlock = styled.h3`
  color: #000;
  font-family: "Montserrat";
  font-size: ${({ $FontSize }) => ($FontSize ? "16px" : "19px")};
  font-weight: ${({ $FontWeight }) => ($FontWeight ? "400" : "500")};
  line-height: ${({ $LineHeight }) => ($LineHeight ? "45px" : "27px")};
  padding-left: ${({ $Padding }) => ($Padding ? "45px" : "0px")};
  margin: ${({ $Margin }) => ($Margin ? "0px" : "none")};

  @media (max-width: 768px) {
    font-size: ${({ $FontSize }) => ($FontSize ? "15px" : "17px")};
    line-height: ${({ $LineHeight }) => ($LineHeight ? "36px" : "24px")};
    padding-left: ${({ $Padding }) => ($Padding ? "30px" : "0px")};
  }

  @media (max-width: 480px) {
    font-size: ${({ $FontSize }) => ($FontSize ? "14px" : "16px")};
    padding-left: ${({ $Padding }) => ($Padding ? "18px" : "0px")};
  }
`;

const ButtonAdd = styled.button`
  font-family: "Montserrat";
  width: ${({ $ButtonAddW }) => ($ButtonAddW ? "400px" : "274px")};
  flex-shrink: 0;
  border-radius: 4px;
  border: none;
  background: #fff;
  height: 42px;
  cursor: pointer;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    background: #c8d5f6;
    color: #fff;
    border-style: none;
    transition: 0.5s;
  }

  @media (max-width: 768px) {
    width: ${({ $ButtonAddW }) => ($ButtonAddW ? "260px" : "220px")};
    height: 38px;
    font-size: 14px;
  }

  @media (max-width: 570px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    height: 36px;
  }
`;

const FormBlock = styled.li`
  display: flex;
  flex-direction: column;
  padding: 5px;
  gap: 2px;
  width: 100%;
`;

const FormInput = styled.input`
  height: 45px;
  border-radius: 5px;
  background-color: #ffffff;
  border: none;
  outline: none;
  font-size: 16px;
  width: 100%;
  padding: 0 10px;
`;

const SubjectSelect = styled.select`
  font-family: "Montserrat";
  width: 100%;
  max-width: 555px;
  height: 45px;
  border-radius: 5px;
  background: #ffffff;
  border: none;
  outline: none;
  font-size: 16px;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    font-size: 15px;
    height: 42px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    height: 40px;
  }
`;

const Notification = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 15px 20px;
  border-radius: 5px;
  color: #fff;
  font-family: "Montserrat";
  font-size: 14px;
  background-color: ${({ $isSuccess }) => ($isSuccess ? "#28a745" : "#dc3545")};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? "0" : "20px")});
  transition: opacity 0.5s ease, transform 0.5s ease;
  z-index: 1000;
`;

const LaboratoryAdd = () => {
  const [labTitle, setLabTitle] = useState("");
  const [labDescription, setLabDescription] = useState("");
  const [formula, setFormula] = useState("");
  const [inputVariables, setInputVariables] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [tests, setTests] = useState([]);
  const [newTest, setNewTest] = useState({ inp: "", out: "" });
  const [responseMessage, setResponseMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getSubjects()
      .then((res) => setSubjects(res.data))
      .catch((error) => {
        console.error("Ошибка при загрузке предметов:", error);
        setResponseMessage("Ошибка при загрузке предметов");
        setIsSuccess(false);
      });
  }, []);

  useEffect(() => {
    if (responseMessage) {
      setShowNotification(true);
      const timer = setTimeout(() => {
        setShowNotification(false);
        setResponseMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [responseMessage]);

  const handleNewTestChange = (field, value) => {
    setNewTest((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddTest = () => {
    if (!newTest.inp.trim() || !newTest.out.trim()) return;
    setTests((prev) => [...prev, { id: prev.length + 1, ...newTest }]);
    setNewTest({ inp: "", out: "" });
  };

  const handleRemoveTest = (index) => {
    setTests(tests.filter((_, i) => i !== index));
  };

  const sendDataToServer = async (data) => {
    createLab(data)
      .then(() => {
        setResponseMessage("Лабораторная работа успешно добавлена!");
        setIsSuccess(true);
      })
      .catch((error) => {
        console.error("Ошибка при отправке запроса:", error);
        setResponseMessage("Ошибка при добавлении лабораторной работы");
        setIsSuccess(false);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !labTitle.trim() ||
      !labDescription.trim() ||
      !formula.trim() ||
      !inputVariables.trim() ||
      !subjectId ||
      tests.length === 0
    ) {
      setResponseMessage("Заполните все поля!");
      setIsSuccess(false);
      return;
    }

    const newData = {
      task: {
        id: 1,
        name: labTitle,
        description: labDescription,
        teacher_formula: formula,
        input_variables: inputVariables,
        subject_id: parseInt(subjectId),
        test_cases: tests.map((test, index) => ({
          id: index + 1,
          inp: test.inp,
          out: test.out,
        })),
      },
    };

    sendDataToServer(newData);
  };

  return (
    <>
      <Section onSubmit={handleSubmit}>
        <UlList>
          <List>
            <NameLabInput
              type="text"
              placeholder="Введите название лабораторной работы"
              onChange={(e) => setLabTitle(e.target.value)}
              value={labTitle}
            />
          </List>

          <List>
            <div className="editing__block-Two">
              <TitleBlock>Формула преподавателя:</TitleBlock>
              <input
                className="editing__block-input"
                type="text"
                value={formula}
                onChange={(e) => setFormula(e.target.value)}
                placeholder="Введите формулу"
              />
            </div>
          </List>

          <List>
            <div className="editing__block-Two">
              <TitleBlock>Входные переменные:</TitleBlock>
              <input
                className="editing__block-input"
                type="text"
                value={inputVariables}
                onChange={(e) => setInputVariables(e.target.value)}
                placeholder="Введите переменные через запятую"
              />
            </div>
          </List>

          <List>
            <div className="editing__block-Two">
              <TitleBlock>Формат ввода данных:</TitleBlock>
              <p className="editing__block-text">
                Вы можете пояснить, как будет происходить ввод данных
              </p>
              <input
                className="editing__block-input"
                type="text"
                onChange={(e) => setLabDescription(e.target.value)}
                placeholder="Введите текст"
                value={labDescription}
              />
            </div>
          </List>

          <List $Block style={{ height: "133px" }}>
            <div className="editing__block-Two">
              <TitleBlock>Выберите предмет:</TitleBlock>
              <SubjectSelect
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
              >
                <option value="">Выберите предмет</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </SubjectSelect>
            </div>
          </List>

          <BigBlock $BigFon $BigHeight $BigWeight $GapForm>
            <div className="block__one">
              <TitleBlock $Padding $Margin>
                Список тестов:
              </TitleBlock>
              <UlMinBlock>
                {tests.map((test, index) => (
                  <MinBlock key={index}>
                    <TitleBlock $FontSize $FontWeight $Margin>
                      Тест {index + 1}
                    </TitleBlock>
                    <div className="editing__block-name">
                      <TitleBlock $FontSize $FontWeight $Margin>
                        Входные данные:
                      </TitleBlock>
                      <input
                        type="text"
                        className="some-input"
                        value={test.inp}
                        readOnly
                      />
                    </div>
                    <div className="editing__block-name">
                      <TitleBlock $FontSize $FontWeight $Margin>
                        Вывод:
                      </TitleBlock>
                      <input
                        type="text"
                        className="some-input"
                        value={test.out}
                        readOnly
                      />
                    </div>
                    <IoIosClose
                      className="icon"
                      onClick={() => handleRemoveTest(index)}
                    />
                  </MinBlock>
                ))}
              </UlMinBlock>
            </div>

            <div className="block__test">
              <TitleBlock>Добавить новый тест:</TitleBlock>
              <div className="editing__block-name">
                <TitleBlock $FontSize $FontWeight>
                  Входные данные:
                </TitleBlock>
                <input
                  type="text"
                  className="some-input"
                  value={newTest.inp}
                  onChange={(e) => handleNewTestChange("inp", e.target.value)}
                />
              </div>
              <div className="editing__block-name">
                <TitleBlock $FontSize $FontWeight>
                  Вывод:
                </TitleBlock>
                <input
                  type="text"
                  className="some-input"
                  value={newTest.out}
                  onChange={(e) => handleNewTestChange("out", e.target.value)}
                />
              </div>
              <ButtonAdd $ButtonAddW type="button" onClick={handleAddTest}>
                Добавить тест
              </ButtonAdd>
            </div>
          </BigBlock>
          <List style={{ width: "463px" }}>
            <div
              className="editing__block-Two"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                paddingTop: "20px",
                paddingBottom: "25px",
              }}
            >
              <TitleBlock>Количество попыток:</TitleBlock>
              <input
                className="editing__block-input"
                type="number"
                placeholder="Максимальное количество попыток"
                min="1"
                style={{ width: "396px" }}
              />
              <div
                className="editing__block-bth"
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: "20px",
                  marginTop: "5px",
                }}
              >
                <ButtonAdd type="button" style={{ width: "200px" }}>
                  Сохранить
                </ButtonAdd>
                <ButtonAdd type="button" style={{ width: "200px" }}>
                  Удалить
                </ButtonAdd>
              </div>
            </div>
          </List>

          <div className="block__button">
            <button className="block__end" type="submit">
              <span className="block__end-link">
                Завершить редактирование и добавить лабораторную
              </span>
            </button>
          </div>
        </UlList>
      </Section>

      {showNotification && (
        <Notification $isSuccess={isSuccess} $visible={showNotification}>
          {responseMessage}
        </Notification>
      )}
    </>
  );
};

export default LaboratoryAdd;
