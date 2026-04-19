import React from "react";
import "../../styles/style.css";

const TeacherDisciplines = () => {

    const mock = [
        "Python",
        "C#",
        "Java"
    ];

    return (
        <div className="main">

            <h2 style={{ marginBottom: "20px" }}>
                Личный кабинет/Дисциплины
            </h2>

            <div className="section__lab-blockSearch" style={{ marginBottom: "30px" }}>
                <input
                    className="section__lab-input"
                    placeholder="Название дисциплины"
                />

                <div className="section__lab-btn">▼</div>
                <div className="section__lab-btn">▼</div>
            </div>

            {mock.map((item, index) => (
                <div key={index} className="section__lab-number">

          <span style={{ fontSize: "18px" }}>
            {item}
          </span>

                    <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>

                        <div
                            style={{
                                background: "#D9D9D9",
                                padding: "6px 10px",
                                borderRadius: "6px",
                                fontSize: "14px"
                            }}
                        >
                            5/10
                        </div>

                        <button className="section__lab-btn">
                            Перейти
                        </button>

                    </div>

                </div>
            ))}

        </div>
    );
};

export default TeacherDisciplines;