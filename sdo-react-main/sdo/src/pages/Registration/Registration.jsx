import React, { useState } from "react";
import "../../styles/style.css";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'
import { registerUser } from '../../api/auth-api';

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 7%;
  padding: 40px 0px 200px;
`
const SectionHeading = styled.h1`
  text-align: center;
  font-size: 29px;
  line-height: 35px;
  color: #252525;
  font-family: 'Montserrat';
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 2%;

  .section__login-formInput{
    width: 450px;
    height: 35px;
    font-size: 16px;
    color: #252525;
    font-family: 'Montserrat';
    outline: none;
}
`
const Button = styled.button`
    height: 40px;
    cursor: pointer;
    border-radius: 6px;
    border-style: none;
    background-color: #C8D5F6;
    font-size: 15px;
    color: #252525;
    font-family: 'Montserrat';
    
    &:hover{
    background-color: #DDE5F9;
    color: #FFF;
    transition: 0.4s;

}
`
const Registration = () => {
  const [newUserState, setNewUser] = useState({
      username: "",
      password: "",
      group_name: "",
    }
  );

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    registerUser(newUserState)
    .then(res => {
      const token = res.data.access_token;
      const role = res.data.status; // <--- ключевая замена
  
      localStorage.setItem('access_token', token);
      localStorage.setItem('role', role);
  
      // Переход в зависимости от роли
      if (role === 'student') {
        navigate('/PersonalStud');
      } else if (role === 'teacher') {
        navigate('/PersonalTeacher');
      }
    })
    .catch(error => {
      console.error("Ошибка регистрации:", error.message);
    });  
  };

  return (
    <>
      <Section>
        <SectionHeading> 
          Регистрация
        </SectionHeading>
        <Form 
          className='section__login-form' 
          method='post'
          action='#'
          onSubmit={handleSubmit}
        >
          <input 
            type="text" 
            placeholder=" Username" 
            name='name'
            value={newUserState.username}
            className='section__login-formInput'
            onChange={(e) => setNewUser({...newUserState, username: e.target.value})}
          />
          <input 
            type="password"
            placeholder=" Password"
            name='somepassword'
            value={newUserState.password}
            className='section__login-formInput'
            onChange={(e) => setNewUser({...newUserState, password: e.target.value})}
          />
          <input 
            type="text"
            placeholder=" Group"
            name='group_name'
            value={newUserState.group_name}
            className='section__login-formInput'
            onChange={(e) => setNewUser({...newUserState, group_name: e.target.value})}
          />
          <Button type="submit">
            Зарегистрироваться
          </Button>
        </Form>
      </Section>
    </>
  );
}

export default Registration;