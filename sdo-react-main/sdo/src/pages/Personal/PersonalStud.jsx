import styled from "styled-components"
import React, { useState, useEffect } from "react";
import { getUserData } from '../../api/user-api';
import { getSubjects } from '../../api/subjects-api';
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

    const [studentInfo, setStudentInfo] = useState({
        username: "",
        password: "",
        roletype : "",
        studygroup: "",
        form_education: "",
        faculty: ""
    });

    const [subjectsInfo, setSubjectsInfo] = useState([]);

    useEffect(() => {
        getUserData()
            .then(res => {
                setStudentInfo(res.data);
            })
            .catch(error => {
                console.error(error.message);
            });
        
        getSubjects()
            .then(res => {
                setSubjectsInfo(res.data);
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
                            <Text>ФИО студента:</Text>
                            <Text>{studentInfo.username}</Text>
                        </List>
                        <List>
                            <Text>Номер группы:</Text>
                            <Text>{studentInfo.studygroup}</Text>
                        </List>
                        <List>
                            <Text>Форма обучения:</Text>
                            <Text>{studentInfo.form_education}</Text>
                        </List>
                        <List>
                            <Text>Направление обучения:</Text>
                            <Text>{studentInfo.faculty}</Text>
                        </List>
                </RowBlocks>
                <RowBlocks>
                    <BigList>
                        <Text> Дисциплины: </Text>
                        {subjectsInfo.map((item) =>
                        <ListSubject>
                            <Text> {item.name} </Text>
                            <Score>
                                <Text> {item.score} </Text>
                            </Score>
                            <Button onClick={() => {
                                localStorage.setItem('subject', item.id)
                                navigate('/disciplinesStud')
                            }}>
                                <Text> Перейти </Text>
                            </Button>
                        </ListSubject>)}
                    </BigList>
                </RowBlocks>
            </SectionLab>
        </>
     );
}