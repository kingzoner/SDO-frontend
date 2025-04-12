// import React from "react";
// import { BrowserRouter as Router } from "react-router-dom";
// import Header from "./components/header/Header";
// import MainRouter from "./app/routing";
// import Footer from "./components/Footer/Footer";

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Header />
//           <MainRouter />
//         <Footer />
//       </Router>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/header/Header";
import MainRouter from "./app/routing";
import Footer from "./components/Footer/Footer";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Проверка на токен при загрузке
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token); // true если есть токен
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
