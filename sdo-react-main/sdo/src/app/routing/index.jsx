// import React from "react";
// import { Route, Routes, Navigate } from "react-router-dom";
// import Main from "../../components/Main/Main";
// import Auto from "../../pages/Auto/Auto";
// import Laboratory from "../../pages/Laboratory/Laboratory";
// import PrepodRedLab from "../../pages/PrepodRedLab/PrepodRedLab";
// import Registration from "../../pages/Registration/Registration";
// import StudLaboratory from "../../pages/Laboratory/StudLaboratory";
// import LaboratoryAdd from "../../pages/LaboratoryAdd/index";
// import PersonalTeacher from "../../pages/Personal/PersonalTeacher";
// import PersonalStud from "../../pages/Personal/PersonalStud";
// // import MainTeacher from "../../components/Main/mainTeacher";
// // import MainStud from "../../components/Main/mainStud";
// import LabaStud from "../../pages/LabaStud/index";
// import Attempts from "../../pages/Attempts/index";
// import ScrollToTop from "../../components/ScrollToTop";
// import CheckLaboratory from "../../pages/CheckLaboratory/CheckLaboratory";
// import Groups from "../../pages/Groups/Groups";
// import Disciplines from "../../pages/Disciplines/Disciplines";
// import DisciplinesStud from "../../pages/DisciplinesStud/DisciplinesStud"
// import TestLabs from "../../pages/TestLabs/TestLabs";

// const MainRouter = () => {
//   const tokenExist = localStorage.getItem('access_token') != null
//   return (
//     <>
//       <ScrollToTop />
//       <Routes>
//         {/*Публичные*/}
//         <Route path="/login" element={<Auto />} />
//         <Route path="/registration" element={<Registration />} />
//         <Route path="*" element={<Main />} />

//         {/*Закрытые*/}
//         <Route path="/Laboratory" element={tokenExist ? <Laboratory /> : <Navigate to="/login" />} />
//         <Route path="/editingLaboratoryPrep" element={tokenExist ? <PrepodRedLab /> : <Navigate to="/login" />} />
//         <Route path="/LaboratoryAdd" element={tokenExist ? <LaboratoryAdd /> : <Navigate to="/login" />} />
//         <Route path="/PersonalTeacher" element={tokenExist ? <PersonalTeacher /> : <Navigate to="/login" />} />
//         <Route path="/StudLaboratory" element={tokenExist ? <StudLaboratory /> : <Navigate to="/login" />} />
//         <Route path="/PersonalStud" element={tokenExist ? <PersonalStud /> : <Navigate to="/login" />} />
//         <Route path="/LabaStud/:taskId" element={tokenExist ? <LabaStud /> : <Navigate to="/login" />} />
//         <Route path="/attempts" element={tokenExist ? <Attempts /> : <Navigate to="/login" />} />
//         <Route path="/checkLaboratory" element={tokenExist ? <CheckLaboratory /> : <Navigate to="/login" />} />
//         <Route path="/groups" element={tokenExist ? <Groups /> : <Navigate to="/login" />} />
//         <Route path="/disciplines" element={tokenExist ? <Disciplines /> : <Navigate to="/login" />} />
//         <Route path="/disciplinesStud" element={tokenExist ? <DisciplinesStud /> : <Navigate to="/login" />} />
//         <Route path="/testLabs" element={tokenExist ? <TestLabs /> : <Navigate to="/login" />} />
//       </Routes>
//     </>
//   );
// };

// export default MainRouter;

import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Main from "../../components/Main/Main";
import Auto from "../../pages/Auto/Auto";
import Laboratory from "../../pages/Laboratory/Laboratory";
import PrepodRedLab from "../../pages/PrepodRedLab/PrepodRedLab";
import Registration from "../../pages/Registration/Registration";
import StudLaboratory from "../../pages/Laboratory/StudLaboratory";
import LaboratoryAdd from "../../pages/LaboratoryAdd/index";
import PersonalTeacher from "../../pages/Personal/PersonalTeacher";
import PersonalStud from "../../pages/Personal/PersonalStud";
import LabaStud from "../../pages/LabaStud/index";
import Attempts from "../../pages/Attempts/index";
import ScrollToTop from "../../components/ScrollToTop";
import CheckLaboratory from "../../pages/CheckLaboratory/CheckLaboratory";
import Groups from "../../pages/Groups/Groups";
import Disciplines from "../../pages/Disciplines/Disciplines";
import DisciplinesStud from "../../pages/DisciplinesStud/DisciplinesStud";
import TestLabs from "../../pages/TestLabs/TestLabs";
import ProtectedRoute from "../../components/ProtectedRoute";

const MainRouter = ({ setIsLoggedIn }) => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Публичные */}
        <Route path="/login" element={<Auto setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/" element={<Main />} />

        {/* Закрытые (только teacher) */}
        <Route path="/Laboratory" element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <Laboratory />
          </ProtectedRoute>
        } />
        <Route path="/editingLaboratoryPrep" element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <PrepodRedLab />
          </ProtectedRoute>
        } />
        <Route path="/LaboratoryAdd" element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <LaboratoryAdd />
          </ProtectedRoute>
        } />
        <Route path="/PersonalTeacher" element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <PersonalTeacher />
          </ProtectedRoute>
        } />
        <Route path="/checkLaboratory" element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <CheckLaboratory />
          </ProtectedRoute>
        } />
        <Route path="/groups" element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <Groups />
          </ProtectedRoute>
        } />
        <Route path="/disciplines" element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <Disciplines />
          </ProtectedRoute>
        } />

        {/* Только student */}
        <Route path="/StudLaboratory" element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudLaboratory />
          </ProtectedRoute>
        } />
        <Route path="/PersonalStud" element={
          <ProtectedRoute allowedRoles={['student']}>
            <PersonalStud />
          </ProtectedRoute>
        } />
        <Route path="/disciplinesStud" element={
          <ProtectedRoute allowedRoles={['student']}>
            <DisciplinesStud />
          </ProtectedRoute>
        } />
        <Route path="/LabaStud/:taskId" element={
          <ProtectedRoute allowedRoles={['student']}>
            <LabaStud />
          </ProtectedRoute>
        } />
        <Route path="/attempts" element={
          <ProtectedRoute allowedRoles={['student']}>
            <Attempts />
          </ProtectedRoute>
        } />
        <Route path="/testLabs" element={
          <ProtectedRoute allowedRoles={['student']}>
            <TestLabs />
          </ProtectedRoute>
        } />

        {/* Если ничего не подошло — редирект */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default MainRouter;
