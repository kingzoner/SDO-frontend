import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../../styles/style.css";
import styled from "styled-components";

const SectionLab = styled.div`
display:flex;
flex-direction:column;
align-items:center;
gap:10px;
padding:25px 0px 20px;

.section__lab-blockSearch{
display:flex;
gap:10px;
align-items:center;
}

.section__lab-input{
width:290px;
height:26px;
padding:10px;
background:#F0F0F0;
border-style:none;
border-radius:4px;
font-size:16px;
}

.section__lab-input:focus{
outline-width:0;
}

.section__lab-block{
padding-left:2%;
}

.section__lab-btn{
width:280px;
padding:10px;
font-size:16px;
text-align:center;
color:#000;
font-family:'Montserrat';
line-height:27px;
text-decoration:none;
background:#F0F0F0;
border-style:none;
border-radius:4px;
}

.section__lab-btn:hover{
background:#C8D5F6;
color:#FFF;
transition:0.5s;
}

.alternate-color{
background:rgba(216,216,216,0.38);
}
`;

const NameLab = styled.p`
color:#000;
text-align:center;
font-family:'Montserrat';
font-size:19px;
padding-left:5%;
`;

const ListLab = styled.ul`
display:flex;
flex-direction:column;
gap:10px;

.section__lab-number{
width:1246px;
height:120px;
background:rgba(226,237,208,0.55);
border-radius:10px;
list-style:none;
display:flex;
align-items:center;
}

.list__link{
text-decoration:none;
}
`;

const StudLaboratory = () => {

    const [labItems,setLabItems]=useState({
        isLoading:true,
        data:[]
    });

    const [searchValue,setSearchValue]=useState("");

    const handleSearchChange=(event)=>{
        setSearchValue(event.target.value);
    };

    const handleDeleteClick=(index)=>{
        const updated=[...labItems.data];
        updated.splice(index,1);
        setLabItems(prev=>({...prev,data:updated}));
    };

    useEffect(()=>{
        fetch("http://0.0.0.0:8002/tasks",{
            method:"GET",
            headers:{
                accept:"application/json"
            }
        })
            .then(response=>{
                if(response.ok){
                    return response.json();
                }
                throw new Error("Failed to fetch tasks");
            })
            .then(data=>{

                const tasksArray=Object.keys(data).map(key=>({
                    id:key,
                    description:data[key]
                }));

                setLabItems({
                    isLoading:false,
                    data:tasksArray
                });

            })
            .catch(error=>{
                console.error(error.message);
            });

    },[]);

    const getColors=(index)=>{
        return index%2===0
            ? "section__lab-number"
            : "section__lab-number alternate-color";
    };

    return(

        <SectionLab>

            <div className="section__lab-block">

                <div className="section__lab-blockSearch">

                    <input
                        type="text"
                        placeholder="Поиск"
                        value={searchValue}
                        onChange={handleSearchChange}
                        className="section__lab-input"
                    />

                    <Link className="section__lab-btn">
                        Все лабораторные
                    </Link>

                    <Link className="section__lab-btn">
                        Выполнено
                    </Link>

                    <Link className="section__lab-btn">
                        Не выполнено
                    </Link>

                </div>

            </div>

            <ListLab>

                {labItems.isLoading ? (

                    <p>Loading...</p>

                ) : (

                    labItems.data
                        .filter(lab=>
                            lab.description
                                .toLowerCase()
                                .includes(searchValue.toLowerCase())
                        )
                        .map((labTitle,index)=>(
                            <Link
                                className="list__link"
                                to={`/labaStud/${labTitle.id}`}
                                key={labTitle.id}
                            >

                                <li className={getColors(index)}>
                                    <NameLab>{labTitle.description}</NameLab>
                                </li>

                            </Link>
                        )).reverse()

                )}

            </ListLab>

        </SectionLab>

    );

};

export default StudLaboratory;