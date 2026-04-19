import TeacherDisciplines from "../Teacher/TeacherDisciplines";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Section = styled.section`
 display: flex;
 flex-direction: column;
 align-items: center;
 padding: 40px 0px 245px;
`;

const MainTeacher = () => {

    const navigate = useNavigate();

    const disciplines = [
        { id: 1, name: "C++" },
        { id: 2, name: "Python" },
        { id: 3, name: "Java" },
        { id: 4, name: "C#" }
    ];

    return (
        <Section>

            return (
            <TeacherDisciplines />
            );

            {disciplines.map(discipline => (
                <button
                    key={discipline.id}
                    onClick={() => navigate(`/laboratory/${discipline.id}`)}
                >
                    {discipline.name}
                </button>
            ))}

        </Section>
    );
};

export default MainTeacher;