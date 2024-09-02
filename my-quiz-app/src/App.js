import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard.jsx';
import About from './pages/About';
import Submissions from './pages/Submissions';
import InsertQuizData from './pages/InsertQuizData';
import QuizGenerator from './pages/QuizGenerator';
import Assignments from './pages/Assignments';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import LoginSignup from './pages/LoginSignup';

import React, { useState } from 'react';
import useToken from './components/useToken';

function App() {
  const {token, setToken} = useToken();

  if(!token){
    return <LoginSignup setToken={setToken} />
  }

  return (
    <BrowserRouter>
    <Sidebar>
      <Routes>
        <Route path='/'element={<Dashboard/>}/>
        <Route path='/dashboard'element={<Dashboard/>}/>
        <Route path='/about'element={<About/>}/>
        <Route path='/insertquizdata'element={<InsertQuizData/>}/>
        <Route path='/submissions'element={<Submissions/>}/>
        <Route path='/quizGenerator'element={<QuizGenerator/>}/>
        <Route path='/assignments'element={<Assignments/>}/>
        <Route path='/quiz' element={<Quiz/>}/>
        <Route path='/result' element={<Result/>}/>
      </Routes>
    </Sidebar>
    </BrowserRouter>
  );

};

export default App;
