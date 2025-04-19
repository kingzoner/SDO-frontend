import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/header/Header";
import MainRouter from "./app/routing";
import Footer from "./components/Footer/Footer";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access_token")
  );

  useEffect(() => {
    // Проверка на токен при загрузке
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);

    // Слушатель изменений в localStorage
    const handleStorageChange = () => {
      const token = localStorage.getItem("access_token");
      setIsLoggedIn(!!token);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="App">
      <Router>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <MainRouter setIsLoggedIn={setIsLoggedIn} />
        <Footer />
      </Router>
    </div>
  );
}

export default App;