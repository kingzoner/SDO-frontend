import styled from "styled-components"

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
const PersonalStud = () => {

    return (
        <>
            <SectionLab>
                <RowBlocks>
                        <List>
                            <Text>
                                ФИО студента:
                            </Text>
                            <TextMain>
                                Иванов Иван Иванович
                            </TextMain>
                        </List>
                        <List>
                            <Text>
                                Номер группы:
                            </Text>
                            <TextMain>
                                221-111  
                            </TextMain>
                        </List>
                        <List>
                            <Text>
                                Форма обучения:
                            </Text>
                            <TextMain>
                                Очная
                            </TextMain>
                        </List>
                        <List>
                            <Text>
                                Направление обучения:
                            </Text>
                            <TextMain>
                                Информационная безопасность
                            </TextMain>
                        </List>
                </RowBlocks>
                <RowBlocks>
                    <BigList>
                        <TextD>
                            Дисциплины:
                        </TextD>
                        <ListSubject>
                            <SubjectName>
                                <TextObj>
                                    Базы данных
                                </TextObj>
                            </SubjectName>
                            <ActionWrapper>
                                <Score score={4}>
                                    <ScoreText>
                                        4/10
                                    </ScoreText>
                                </Score>
                                <Button>
                                    <TextButton>
                                        Перейти
                                    </TextButton>
                                </Button>
                            </ActionWrapper>
                        </ListSubject>
                        <ListSubject>
                        <SubjectName>
                            <TextObj>
                            Программирование на языке С++
                            </TextObj>
                        </SubjectName>
                        <ActionWrapper>
                            <Score score={4}>
                                <ScoreText>
                                    4/10
                                </ScoreText>
                            </Score>
                            <Button>
                                <TextButton>
                                    Перейти
                                </TextButton>
                            </Button>
                        </ActionWrapper>
                    </ListSubject>
                    <ListSubject>
                        <SubjectName>
                            <TextObj>
                            Разработка web приложений
                            </TextObj>
                        </SubjectName>
                        <ActionWrapper>
                            <Score score={5}>
                                <ScoreText>
                                    5/10
                                </ScoreText>
                            </Score>
                            <Button>
                                <TextButton>
                                    Перейти
                                </TextButton>
                            </Button>
                        </ActionWrapper>
                    </ListSubject>
                    <ListSubject>
                        <SubjectName>
                            <TextObj>
                            Программирование на языке python
                            </TextObj>
                        </SubjectName>
                        <ActionWrapper>
                            <Score score={7}>
                                <ScoreText>
                                    7/10
                                </ScoreText>
                            </Score>
                            <Button>
                                <TextButton>
                                    Перейти
                                </TextButton>
                            </Button>
                        </ActionWrapper>
                    </ListSubject>
                    <ListSubject>
                        <SubjectName>
                            <TextObj>
                            Методы и языки программирования
                            </TextObj>
                        </SubjectName>
                        <ActionWrapper>
                            <Score score={10}>
                                <ScoreText>
                                    10/10
                                </ScoreText>
                            </Score>
                            <Button>
                                <TextButton>
                                    Перейти
                                </TextButton>
                            </Button>
                        </ActionWrapper>
                    </ListSubject>
                    </BigList>
                </RowBlocks>
            </SectionLab>
        </>
     );
}
 
export default PersonalStud;