import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Main from "../../pages/MainPage/MainPage";
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
import StudentPage from "../../pages/StudentPage/StudentPage";

const MainRouter = ({ setIsLoggedIn }) => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Auto setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/registration"
          element={<Registration setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/" element={<Main />} />

        <Route path="/student/:id" element={<StudentPage />} />

        <Route path="/Laboratory" element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <Laboratory />
          </ProtectedRoute>
        } />
        <Route path="/PrepodRedLab/:id" element={
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
        <Route path="/groups/:groupId" element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <Groups />
          </ProtectedRoute>
        } />
        <Route path="/disciplines" element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <Disciplines />
          </ProtectedRoute>
        } />

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

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default MainRouter;
