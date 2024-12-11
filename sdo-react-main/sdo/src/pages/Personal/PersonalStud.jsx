import styled from "styled-components"
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
    height: 100px;
    background-color: #D5DEF6;
    border-radius: 7px;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const ListSubject = styled.li`
    width: 520px;
    height: 50px;
    background-color: #fff;
    border-radius: 7px;
    list-style-type: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`
const BigList = styled.li`
    width: ${({ $Block }) => ($Block ? '673px' : '673px')};
    height: ${({ $Block }) => ($Block ? '430px' : '430px')};
    background-color: #E2EDD0;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style-type: none;
    justify-content: space-around;
`
const Score = styled.div`
    width: 40px;
    height: 40px;
    background-color: grey;
    border-radius: 7px;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
`
const Text = styled.p`
    font-family: 'Montserrat';
    font-size: 16px;
    font-weight: 600;  
`
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
    background-color: #C8D5F6;
    border-radius: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
`
export default function PersonalStud(){
    const [studentInfo, setStudentInfo] = useState({
        username: "",
        password: "",
        roletype : "",
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
                            <Text content="ФИО студента:"/>
                            <Text content={studentInfo.username}/>
                        </List>
                        <List>
                            <Text content="Номер группы:"/>
                            <Text content={studentInfo.studygroup}/>
                        </List>
                        <List>
                            <Text content="Форма обучения:"/>
                            <Text content={studentInfo.form_education}/>
                        </List>
                        <List>
                            <Text content="Направление обучения:"/>
                            <Text content={studentInfo.faculty}/>
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