import React from "react";
import styled from "styled-components";

import GroupWindow from "./components/GroupWindow.jsx";

const GroupsContainer = styled.div`
  display: flex;

  flex-direction: column; /* Располагаем дочерние элементы в столбик */

  align-items: center; /* Центрирование по горизонтали */

  margin: 20px; /* Отступ сверху и центрирование по горизонтали */
`;

const StyledContainer = styled.div`
  background-color: #e6f4cf;

  font-family: "Montserrat";

  width: 1480px;

  height: 100px;

  padding: 0 20px;

  display: flex;

  align-items: center;

  justify-content: space-between;

  margin: 10px 0; /* Отступ между компонентами */

  transition: background-color 0.3s;

  border-radius: 7px;
`;

const GroupContent = styled.div`
  display: flex;

  align-items: center;
`;

const GroupNumber = styled.div`
  font-weight: normal;

  font-size: 20px;

  margin-right: 10px;
`;

const ChangeButton = styled.button`
  font-weight: normal;

  font-size: 20px;

  background-color: #becbee;

  color: white;

  border: none;

  border-radius: 5px;

  cursor: pointer;

  height: 42px;

  padding: 0 15px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Groups = () => {
  const [groupNumbers, setGroups] = useState([]);
  
  useEffect(() => {
    getFacultyGroups()
      .then(res => {
        setGroups(res.data);
      })
      .catch(error => {
        console.error(error.message);
      });
  }, []);

  return (
    <GroupsContainer>
      {groupNumbers.map((group) => (
        <GroupWindow key={group.group_id} groupNumber={group.group_id} />
      ))}
    </GroupsContainer>
  );
};

export default Groups;
