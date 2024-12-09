import styled from "styled-components";
import React, { useState, useEffect } from "react";
import UserData from ".models/UserDataModel.tsx";

const SectionLab = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
    padding: 75px 0px 100px;
`
const List = styled.li`
    width: 320px;
    height: auto;
    background-color: #BECBEE;
    border-radius: 7px;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 10px 20px;
    gap: 5px;
`;

const ListSubject = styled.li`
    width: 550px;
    height: 70px;
    background-color: #fff;
    border-radius: 7px;
    list-style-type: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
`

const SubjectName = styled.div`
    flex: 1;
    text-align: left;
`

const ActionWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

const BigList = styled.li`
    width: ${({ $Block }) => ($Block ? '673px' : '673px')};
    height: ${({ $Block }) => ($Block ? '500px' : '500px')}; /* можно увеличить высоту, например, до 550px */
    background-color: #E2EDD0;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style-type: none;
    justify-content: space-around;
    margin-left: 20px;
    padding-bottom: 20px; /* добавляем отступ снизу */
`


const Score = styled.div`
    width: 50px;
    height: 40px;
    background-color: ${({ score }) => (score < 10 ? '#D9D9D9' : '#21B200')};
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const Text = styled.p`
    font-family: 'Montserrat';
    font-size: 16px;
    margin: 0 0 10px;
`;

const TextD = styled.h1`
    font-family: 'Montserrat';
    font-size: 18px;
    margin-bottom: 0px;
    text-align: left; /* Выравнивание текста по левому краю */
    align-self: flex-start; /* Располагает элемент слева внутри контейнера */
    padding-left: 55px; /* Добавляем небольшой отступ слева */
`;


const TextObj = styled.p`
    font-family: 'Montserrat';
    font-size: 16px;
    margin: 0 15 10px;
`;

const TextMain = styled.h1`
    font-family: 'Montserrat';
    font-size: 16px;
    margin: 0 0 10px;
    font-weight: 600;
`;

const TextButton = styled.p`
    font-family: 'Montserrat';
    font-size: 16px;
    margin-top: 15px;
    color: #FFFFFF;
`;

const ScoreText = styled.p`
    font-family: 'Montserrat';
    font-size: 16px;
    margin-top: 15px;
    color: #FFFFFF;
`;

const RowBlocks = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 0px 0px 20px;

`
const Button = styled.div`
    width: 100px;
    height: 40px;
    background-color: #BECBEE;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
`
export default function PersonalStud() {
    const [studentInfo, setStudentInfo] = useState <UserData>({
        username: "",
        password: "",
        roletype: "",
        studygroup: "",
        form_education: "",
        faculty: ""
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
    };

    useEffect(() => {
        fetch('http://127.0.0.1:8000/user_data', requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch');
                }
            })
            .then(data => {
                setStudentInfo(data);
            })
            .catch(error => {
                console.error(error.message);
            });
    }, []);

    return (
        <>
            <SectionLab>
                <RowBlocks>
                    <List>
                        <Text content="ФИО студента:" />
                        <Text content={studentInfo.username} />
                    </List>
                    <List>
                        <Text content="Номер группы:" />
                        <Text content={studentInfo.studygroup} />
                    </List>
                    <List>
                        <Text content="Форма обучения:" />
                        <Text content={studentInfo.form_education} />
                    </List>
                    <List>
                        <Text content="Направление обучения:" />
                        <Text content={studentInfo.faculty} />
                    </List>
                </RowBlocks>
                <RowBlocks>
                    <BigList>
                        <Text>
                            Дисциплины:
                        </Text>
                        <ListSubject>
                            <Text>
                                Предмет
                            </Text>
                            <Score>
                                <Text>
                                    5/10
                                </Text>
                            </Score>
                            <Button>
                                <Text>
                                    Перейти
                                </Text>
                            </Button>
                        </ListSubject>
                    </BigList>
                </RowBlocks>
            </SectionLab>
        </>
    );
}