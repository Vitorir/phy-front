import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Home } from '../src/pages/public/Home/Index'


import { isAuthenticated } from "./services/auth";
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

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};

const AppRoutes = () => (
  <BrowserRouter>
  <NavBar></NavBar>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/log-in" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/profile/:id" element={<ProfilePage />} />
      <Route path="/measuresheet/" element={<MeasureSheet />} />
      <Route path="/exercisesheet/" element={<ExerciseSheet />} />
      <Route path="/app" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
