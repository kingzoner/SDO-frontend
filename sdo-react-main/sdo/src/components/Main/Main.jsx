import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components'
import { LABORATORY_ROUTE } from '../../app/routing/route';
import { useDispatch } from 'react-redux';
import { login } from '../../pages/Auto/Slice/authSlice'; 
import { useNavigate } from 'react-router-dom';
const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 0px 245px;

    /* планшеты и небольшие экраны */
    @media (max-width: 768px) {
      padding: 32px 24px 180px;
    }

    /* мобильный макет до 480px */
    @media (max-width: 480px) {
      padding: 32px 16px 140px;
    }
`;
const SectionHead = styled.h1`
    color: #000;
    font-family: 'Montserrat';
    font-size: 30px;
    font-weight: 500;
    line-height: 27px; 
`
const Block = styled.div`
    display: flex;
    gap: 40px;
    padding-top: 35px;

    .section__block-btn{
      width: 400px;
      max-width: 100%;
      height: 150px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Montserrat';
      font-size: 24px;
      cursor: pointer;
      text-decoration: none;
      color: #000;
      border-radius: 7px;
      background: #E2EDD0;
    }
    .section__block-btn:hover{
        background: #C8D5F6;
        color: #FFF;
        transition: 0.3s;
    }

    /* до 768px кнопки становятся колонкой и имеют контролируемую ширину */
    @media (max-width: 768px) {
      flex-direction: column;
      width: 100%;
      max-width: 420px;
      margin: 24px auto 0;
      align-items: stretch;

      .section__block-btn{
        width: 100%;
        height: 130px;
        font-size: 22px;
      }
    }

    /* до 480px слегка уменьшаем размер */
    @media (max-width: 480px) {
      .section__block-btn{
        height: 120px;
        font-size: 20px;
      }
    }
`;

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleLogin = (role) => {
    dispatch(login({ role }));
    console.log("Successful login. Redirecting...");
    navigate(LABORATORY_ROUTE);
  };
    return ( 
      <>
        <Section>
          <SectionHead>
            Войдите в учетную запись или зарегистрируйтесть:
          </SectionHead>
          <Block>
            <Link 
              className="section__block-btn" 
              to="/login" 
              onClick={() => handleLogin('student')}
            >
              Студент
            </Link>
            <Link 
              className="section__block-btn" 
              to="/login" 
              onClick={() => handleLogin('teacher')}
            > 
              Преподаватель
            </Link>
          </Block>
        </Section>
      </>
    );
}

export default Main;
