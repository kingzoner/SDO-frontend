import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { IoIosClose } from "react-icons/io";
import { IoFolderOpenOutline, IoCloudUploadOutline } from "react-icons/io5";
import { labData } from "../../api/teacher-api";
import { editLab } from "../../api/teacher-api";
import { getLabs } from "../../api/teacher-api";

// Стили
const Section = styled.section`
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
`;

const BigBlock = styled.div`
  width: ${({ $BigWeight }) => ($BigWeight ? "1248px" : "1247px")};
  height: ${({ $BigHeight }) => ($BigHeight ? "530px" : "375px")};
  background-color: ${({ $BigFon }) => ($BigFon ? "#E2EDD0" : "#D5DEF6")};
  border-radius: 10px;
  display: flex;
  gap: ${({ $GapForm }) => ($GapForm ? "75px" : "0px")};
  .block__test {
    width: 540px;
    display: flex;
    flex-direction: column;
    margin-top: 5px;
  }
  .block__one {
    margin-top: 5px;
  }
`;

const MinBlock = styled.li`
  width: 592px;
  height: 102px;
  border-radius: 10px;
  background-color: #ffffff;
  padding: 10px;
  list-style-type: none;
  position: relative;
  .icon {
    position: absolute;
    top: 5px;
    right: 10px;
    cursor: pointer;
  }
`;

const UlMinBlock = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-top: ${({ $PaddingTopForm }) => ($PaddingTopForm ? "10px" : "15px")};
  max-height: 420px; 
  overflow-y: auto;  
  padding-right: 8px; 
`;

const UlList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;

  .editing__container {
    width: 608px;
    height: 260px;
    background: #e2edd0;
    border-radius: 7px;
    list-style-type: none;
    display: flex;
    align-items: center;
  }
  .editing__block-Two {
    padding: 0px 30px 30px 20px;
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
  }
  .editing__block-input {
    width: 555px;
    height: 60px;
    border-radius: 7px;
    border-style: none;
    color: #000;
    font-family: "Montserrat";
    font-size: 16px;
    line-height: 27px;
    outline: none;
  }
  .editing__block-bth {
    display: flex;
    gap: 10px;
  }
  .editing__block {
    padding: 0px 30px 0px 20px;
    display: flex;
    gap: 75px;
    align-items: baseline;
  }
  .editing__block-name {
    display: flex;
    align-items: baseline;
  }
  .block__button {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .block__end {
    display: flex;
    flex-direction: column;
    gap: 5px;
    background-color: #e2edd0;
    border-radius: 5px;
    width: 1248px;
    height: 117px;
    justify-content: center;
    border-style: none;
    align-items: center;
    cursor: pointer;
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
    width: 1248px;
  }
`;

const List = styled.li`
  width: ${({ $Block }) => ($Block ? "1248px" : "608px")};
  height: ${({ $Block }) => ($Block ? "59px" : "260px")};
  background-color: ${({ $Block }) => ($Block ? "#D9D9D9" : "#D5DEF6")};
  border-radius: 7px;
  display: flex;
  align-items: center;
  list-style-type: none;
`;

const NameLabInput = styled.input`
  display: flex;
  border: none;
  background: none;
  width: 608px;
  height: 260px;
  font-size: 18px;
  padding: 0px 0px 0px 30px;
  outline: none;
`;

const TitleBlock = styled.h3`
  color: #000;
  font-family: "Montserrat";
  font-size: ${({ $FontSize }) => ($FontSize ? "16px" : "19px")};
  font-weight: ${({ $FontWeight }) => ($FontWeight ? "400" : "500")};
  line-height: ${({ $LineHeight }) => ($LineHeight ? "45px" : "27px")};
  padding-left: ${({ $Padding }) => ($Padding ? "45px" : "0px")};
  margin: ${({ $Margin }) => ($Margin ? "0px" : "none")};
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
  &:hover {
    background: #c8d5f6;
    color: #fff;
    border-style: none;
    transition: 0.5s;
  }
`;

// Новый стиль для выпадающего списка
const SubjectSelect = styled.select`
  font-family: "Montserrat";
  width: 555px;
  height: 45px;
  border-radius: 5px;
  background: #ffffff;
  border: none;
  outline: none;
  font-size: 16px;
  padding: 10px;
  margin-top: 10px;
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
  width: 1248px;
  background-color: #d5def6;
  border-radius: 7px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;

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

        if (id) {
            fetchLabData();
            fetchSubjects();
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
                subject_id: subjectId,
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
            <UlList>
                {/* Название лабораторной работы */}
                <List>
                    <NameLabInput
                        type="text"
                        placeholder="Введите название лабораторной работы"
                        value={labTitle}
                        onChange={handleLabTitleChange}
                    />
                </List>

                {/* Формула преподавателя */}
                <List>
                    <div className="editing__block-Two">
                        <TitleBlock>Формула преподавателя:</TitleBlock>
                        <input
                            className="editing__block-input"
                            type="text"
                            value={teacherFormula}
                            onChange={handleTeacherFormulaChange}
                            placeholder="Введите формулу"
                        />
                    </div>
                </List>

                {/* Входные переменные */}
                <List>
                    <div className="editing__block-Two">
                        <TitleBlock>Входные переменные:</TitleBlock>
                        <input
                            className="editing__block-input"
                            type="text"
                            value={inputVariables}
                            onChange={handleInputVariablesChange}
                            placeholder="Введите переменные через запятую"
                        />
                    </div>
                </List>

                {/* Выбор предмета */}
                <List>
                    <div className="editing__block-Two">
                        <TitleBlock>Выберите предмет:</TitleBlock>
                        <SubjectSelect value={subjectId || ""} onChange={handleSubjectChange}>
                            <option value="" disabled>
                                Выберите предмет
                            </option>
                            {subjects.map((subject) => (
                                <option key={subject.id} value={subject.id}>
                                    {subject.name}
                                </option>
                            ))}
                        </SubjectSelect>
                    </div>
                </List>

                {/* Описание лабораторной работы */}
                <List>
                    <div className="editing__block-Two">
                        <TitleBlock>Формат ввода данных:</TitleBlock>
                        <p className="editing__block-text">
                            Вы можете пояснить, как будет происходить ввод данных
                        </p>
                        <input
                            className="editing__block-input"
                            type="text"
                            value={labDescription}
                            onChange={handleLabDescriptionChange}
                            placeholder="Введите текст"
                        />
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