import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Home } from '../src/pages/public/Home/Index';
import { Login } from './pages/public/Login/Login';
import { SignUp } from './pages/public/SignUp/SignUp';
import { Profile } from './pages/public/Profile/Profile';
import { Dashboard } from './pages/private/Dashboard/Dashboard';
import { NotFound } from './pages/public/NotFound/NotFound';
import NavBar from './components/Navbar';
import SearchPage from './pages/private/SeachPage/SearchPage';
import ProfilePage from './pages/private/Profile/Profile';
import MeasureSheet from './pages/private/MeasureSheet/MeasureSheet';
import ExerciseSheet from './pages/private/ExerciseSheet/ExerciseSheet';
import PrivateRoute from './services/PrivateRoute';

// // Função para verificar se o usuário está autenticado
// const isAuthenticated = () => {
//   // Verificar se há um token de autenticação no localStorage
//   const token = localStorage.getItem('token');
//   // Retornar true se o token estiver presente e válido
//   return token ? true : false;
// };


// // Componente para rota privada
// const PrivateRoute = ({ element }) => {
//   return isAuthenticated() ? element : <Navigate to="/log-in" />;
// };

const AppRoutes = () => (
  <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/log-in" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      {/* Rotas públicas */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/search" element={<SearchPage />} />
      {/* Rotas protegidas */}
      <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
      <Route path="/profile/:id" element={<PrivateRoute element={<ProfilePage />} />} />
      <Route path="/measuresheet/" element={<PrivateRoute element={<MeasureSheet />} />} />
      <Route path="/exercisesheet/" element={<PrivateRoute element={<ExerciseSheet />} />} />
      {/* Rota de fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
