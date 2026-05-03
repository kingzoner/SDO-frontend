import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { IoIosClose } from "react-icons/io";
import { IoFolderOpenOutline, IoCloudUploadOutline } from "react-icons/io5";
import { labData } from "../../api/teacher-api";
import { editLab } from "../../api/teacher-api";
import { getLabs } from "../../api/teacher-api";
import { getGroups } from "../../api/teacher-api";

// Стили
const Section = styled.section`
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
    height: 60px;
    border-radius: 7px;
    border-style: none;
    color: #000;
    font-family: "Montserrat";
    font-size: 16px;
    line-height: 27px;
    outline: none;
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

const NameLabBlock = styled.div`
  display: block;
  border: none;
  background: none;
  background-color: #d5def6;
  width: 100%;
  max-width: 1248px;
  min-height: 220px;
  height: auto;
  font-size: 18px;
  padding: 10px 12px 10px 18px;
  outline: none;
  box-sizing: border-box;

  @media (max-width: 768px) {
    font-size: 16px;
    min-height: 200px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
    min-height: 190px;
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

// Новый стиль для выпадающего списка
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

const TextStyle = styled.p`
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  margin: 0;
  text-align: center;
  color: #000;
  padding: 20px;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  max-height: 30px;
`;

// Блок ввода тестов / загрузки .txt
const TestsIOBlock = styled.div`
  width: 100%;
  max-width: 1248px;
  background-color: #d5def6;
  border-radius: 7px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-sizing: border-box;

  .tests-input-title {
    font-family: "Montserrat";
    font-size: 20px;
    color: #000;
  }
  .tests-input {
    background-color: #fff;
    border-radius: 7px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .hint {
    font-family: "Montserrat";
    font-size: 14px;
    color: #000;
  }

  .tools {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .tool-icon {
    width: 28px;
    height: 28px;
    color: #656565;
    cursor: pointer;
  }

  .textarea {
    width: 98%;
    height: 300px;
    resize: vertical;
    border-radius: 6px;
    border: none;
    outline: none;
    background: #f0f0f2;
    font-family: "Montserrat";
    font-size: 14px;
    padding: 12px;
    color: #000;
    box-sizing: border-box;
  }

  @media (max-width: 900px) {
    padding: 14px;
  }

  @media (max-width: 768px) {
    .tests-input-title {
      font-size: 18px;
    }
    .textarea {
      height: 240px;
      font-size: 13px;
    }
  }

  @media (max-width: 480px) {
    padding: 12px;
    .tests-input {
      padding: 12px;
    }
    .textarea {
      height: 200px;
    }
  }
`;

const LaboratoryAdd = () => {
    const { id } = useParams(); // Получаем ID лабораторной работы из URL
    const [labTitle, setLabTitle] = useState("");
    const [labDescription, setLabDescription] = useState("");
    const [teacherFormula, setTeacherFormula] = useState(""); // Новое состояние
    const [inputVariables, setInputVariables] = useState(""); // Новое состояние
    const [subjectId, setSubjectId] = useState(null); // Состояние для subject_id
    const [subjects, setSubjects] = useState([]); // Список предметов
    const [selectedGroup, setSelectedGroup] = useState("")
    const [groups, setGroups] = useState([]);
    const [testCases, setTestCases] = useState([]);
    const [newTestCase, setNewTestCase] = useState({ inp: "", out: "" });
    const [bulkTestsText, setBulkTestsText] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [error, setError] = useState("");

    // Токен авторизации (замените на реальный токен)
    const token = localStorage.getItem("access_token");

    // Загрузка данных лабораторной работы и списка предметов
    useEffect(() => {
        // Получение данных лабораторной работы
        const fetchLabData = async () => {
            labData(id).then((response) => {
                if (response.status === 200) {
                    console.log("Данные лабораторной работы:", response.data);
                    const lab = response.data;
                    setLabTitle(lab.name || "");
                    setLabDescription(lab.description || "");
                    setTeacherFormula(lab.teacher_formula || ""); // Заполняем формулу
                    setInputVariables(lab.input_variables || ""); // Заполняем переменные
                    setSubjectId(lab.subject_id || null);
                    setSelectedGroup(lab.group_id)
                    setTestCases(lab.test_cases || []);
                    setResponseMessage("Данные лабораторной работы загружены!");
                } else {
                    console.error("Ошибка при загрузке данных лабораторной работы:", error);
                    setError("Не удалось загрузить данные лабораторной работы");
                }
            });
        };

        // Получение списка предметов
        const fetchSubjects = async () => {
            getLabs().then((response) => {
                if (response.status === 200) {
                    setSubjects(response.data || []);
                    console.log("Список предметов:", response.data);
                } else {
                    console.error("Ошибка при загрузке списка предметов:", error);
                    setError("Не удалось загрузить список предметов");
                }
            });
        };

        const fetchGroups = async () => {
            getLabs().then((response) => {
                if (response.status === 200) {
                    setGroups(response.data || []);
                } else {
                    console.error("Ошибка при загрузке списка групп:", error);
                    setError("Не удалось загрузить список групп");
                }
            });
        };

        if (id) {
            fetchLabData();
            fetchSubjects();
            fetchGroups();
        }
    }, [id]);

    // Обработка изменения названия лабораторной работы
    const handleLabTitleChange = (event) => {
        setLabTitle(event.target.value);
    };

    // Обработка изменения описания лабораторной работы
    const handleLabDescriptionChange = (event) => {
        setLabDescription(event.target.value);
    };

    // Обработка изменения формулы
    const handleTeacherFormulaChange = (event) => {
        setTeacherFormula(event.target.value);
    };

    // Обработка изменения входных переменных
    const handleInputVariablesChange = (event) => {
        setInputVariables(event.target.value);
    };

    // Обработка изменения предмета
    const handleSubjectChange = (event) => {
        setSubjectId(Number(event.target.value));
    };

    const handleGroupChange = (event) => {
        setSelectedGroup(Number(event.target.value));
    };

    // Обработка изменения полей нового тестового случая
    const handleNewTestCaseChange = (event) => {
        const { name, value } = event.target;
        setNewTestCase((prev) => ({ ...prev, [name]: value }));
    };

    // Добавление нового тестового случая
    const handleAddTestCase = () => {
        if (newTestCase.inp.trim() && newTestCase.out.trim()) {
            setTestCases((prev) => [
                ...prev,
                { id: Date.now(), inp: newTestCase.inp, out: newTestCase.out }, // Временный ID
            ]);
            setNewTestCase({ inp: "", out: "" });
        } else {
            setError("Заполните все поля тестового случая");
        }
    };

    // Импорт тестов из textarea по шаблону: input -> expected
    const importTestsFromText = () => {
        if (!bulkTestsText.trim()) return;
        const lines = bulkTestsText.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
        const imported = [];
        for (const line of lines) {
            const [inp, out] = line.split(/\s*->\s*/);
            if (typeof inp === "string" && typeof out === "string") {
                imported.push({ id: Date.now() + Math.random(), inp, out });
            }
        }
        if (imported.length) {
            setTestCases((prev) => [...prev, ...imported]);
            setBulkTestsText("");
            setError("");
        } else {
            setError("Не удалось распознать тесты. Используйте формат: input -> expected_output");
        }
    };

    // Загрузка .txt и помещение содержимого в textarea
    const fileInputRef = React.useRef(null);
    const onPickFile = () => fileInputRef.current?.click();
    const onFileSelected = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.name.toLowerCase().endsWith(".txt")) {
            setError("Допустим только файл .txt");
            return;
        }
        const reader = new FileReader();
        reader.onload = () => setBulkTestsText(String(reader.result || ""));
        reader.readAsText(file, "utf-8");
        setError("");
    };

    // Удаление тестового случая
    const handleDeleteTestCase = (testCaseId) => {
        setTestCases((prev) => prev.filter((test) => test.id !== testCaseId));
    };

    // Обработка изменения существующего тестового случая
    const handleTestCaseChange = (testCaseId, field, value) => {
        setTestCases((prev) =>
            prev.map((test) =>
                test.id === testCaseId ? { ...test, [field]: value } : test
            )
        );
    };

    // Отправка отредактированных данных на бэкенд
    const handleSaveLabData = async () => {
        if (!subjectId) {
            setError("Выберите предмет");
            return;
        }

        const labData = {
            task: {
                id: Number(id),
                name: labTitle,
                description: labDescription,
                teacher_formula: teacherFormula, // Используем новое состояние
                input_variables: inputVariables, // Используем новое состояние
                subject_id: parseInt(subjectId),
                group_id: parseInt(selectedGroup),
                test_cases: testCases.map((test) => ({
                    id: test.id,
                    inp: test.inp,
                    out: test.out,
                })),
            }
        };

        try {
            const response = await editLab(id, labData);
            if (response.status === 200) {
                console.log("Лабораторная работа успешно обновлена:", response.data);
                setResponseMessage("Лабораторная работа успешно обновлена!");
                setError("");
            } else {
                console.error("Ошибка при обновлении лабораторной работы:", response);
                setError("Не удалось обновить лабораторную работу");
                setResponseMessage("");
            }
        } catch (error) {
            console.error("Ошибка при обновлении лабораторной работы:", error);
            setError("Не удалось обновить лабораторную работу");
            setResponseMessage("");
        }
    };

    return (
        <Section>
          <NameLabBlock>
            <p>
              Вы находитесь в режиме редактирования:
            </p>
            <h1>
              {subjectId.name} {labTitle.name}
            </h1>
          </NameLabBlock>
            <UlList>
                {/* Описание лабораторной работы */}
                <List>
                    <div className="editing__block-Two">
                        <TitleBlock>Описание лабораторной работы</TitleBlock>
                        <p className="editing__block-text">
                        </p>
                        <input
                            className="editing__block-input"
                            type="text"
                            value={labDescription}
                            onChange={handleLabDescriptionChange}
                            placeholder="Введите описание лабораторной работы"
                        />
                    </div>
                </List>

                <List>
                    <div className="editing__block-Two">
                        <TitleBlock>Выберите группу:</TitleBlock>
                        <SubjectSelect value={selectedGroup || ""} onChange={handleGroupChange}>
                            <option value="" disabled>
                                Выберите группу
                            </option>
                            {groups.map((group) => (
                                <option key={group.id} value={group.id}>
                                    {group.name}
                                </option>
                            ))}
                        </SubjectSelect>
                    </div>
                </List>

                {/* Поле для ввода тестов / загрузки файла .txt */}
                <TestsIOBlock>
                    <p className="tests-input-title">Форма для ввода или загрузки тестов</p>
                    <div className="tests-input">
                        <TitleBlock $FontWeight>Введите тесты в формате:</TitleBlock>
                        <div className="hint">input1 -&gt; expected_output1</div>
                        <div className="hint">input2 -&gt; expected_output2</div>
                        <div className="hint" style={{ marginTop: "8px" }}>или перетащите файл в формате .txt:</div>
                        <div className="tools">
                            <IoFolderOpenOutline className="tool-icon" onClick={onPickFile} />
                            <IoCloudUploadOutline className="tool-icon" onClick={onPickFile} />
                            <input
                                type="file"
                                accept=".txt"
                                ref={fileInputRef}
                                onChange={onFileSelected}
                                style={{ display: "none" }}
                            />
                        </div>
                        <div>
                            <textarea
                                className="textarea"
                                placeholder="Введите код"
                                value={bulkTestsText}
                                onChange={(e) => setBulkTestsText(e.target.value)}
                            />
                        </div>
                    </div>
                    <ButtonAdd onClick={importTestsFromText}>Импортировать тесты</ButtonAdd>
                </TestsIOBlock>

                {/* Список тестовых случаев */}
                <BigBlock $BigFon $BigHeight $BigWeight $GapForm>
                    <div className="block__one">
                        <TitleBlock $Padding $Margin>Список тестов:</TitleBlock>
                        <UlMinBlock>
                            {testCases.map((test) => (
                                <MinBlock key={test.id}>
                                    <TitleBlock $FontSize $FontWeight $Margin>
                                        Тест {test.id} "Проверка на ..."
                                    </TitleBlock>
                                    <div className="editing__block-name">
                                        <TitleBlock $FontSize $FontWeight $Margin>
                                            Входные данные:
                                        </TitleBlock>
                                        <input
                                            type="text"
                                            className="some-input"
                                            value={test.inp}
                                            onChange={(e) =>
                                                handleTestCaseChange(test.id, "inp", e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="editing__block-name">
                                        <TitleBlock $FontSize $FontWeight $Margin>Вывод:</TitleBlock>
                                        <input
                                            type="text"
                                            className="some-input"
                                            value={test.out}
                                            onChange={(e) =>
                                                handleTestCaseChange(test.id, "out", e.target.value)
                                            }
                                        />
                                    </div>
                                    <IoIosClose
                                        className="icon"
                                        onClick={() => handleDeleteTestCase(test.id)}
                                    />
                                </MinBlock>
                            ))}
                        </UlMinBlock>
                    </div>

                    {/* Добавление нового тестового случая */}
                    <div className="block__test">
                        <TitleBlock>Добавить новый тест:</TitleBlock>
                        <div className="editing__block-name">
                            <TitleBlock $FontSize $FontWeight>
                                Входные данные:
                            </TitleBlock>
                            <input
                                type="text"
                                className="some-input"
                                name="inp"
                                value={newTestCase.inp}
                                onChange={handleNewTestCaseChange}
                                placeholder="Входные данные"
                            />
                        </div>
                        <div className="editing__block-name">
                            <TitleBlock $FontSize $FontWeight>Вывод:</TitleBlock>
                            <input
                                type="text"
                                className="some-input"
                                name="out"
                                value={newTestCase.out}
                                onChange={handleNewTestCaseChange}
                                placeholder="Ожидаемый вывод"
                            />
                        </div>
                        <ButtonAdd $ButtonAddW onClick={handleAddTestCase}>
                            Добавить тест
                        </ButtonAdd>
                    </div>
                </BigBlock>

                {/* Кнопка сохранения */}
                <div className="block__button">
                    <button className="block__end" onClick={handleSaveLabData}>
                        <Link className="block__end-link" to="/Laboratory">
                            Завершить редактирование и сохранить
                        </Link>
                    </button>
                    {responseMessage && <TextStyle>{responseMessage}</TextStyle>}
                    {error && <p style={{ color: "red" }}>{error}</p>}
                </div>
            </UlList>
        </Section>
    );
};

export default LaboratoryAdd;