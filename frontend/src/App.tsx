import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home/HomePage';
import MnistPage from './pages/mnist/index';
import TelegramPage from './pages/Telegram/TelegramPage';
import NotFoundPage from './NotFoundPage';

const App: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/telegram" element={<TelegramPage />} />
          <Route path="/mnist" element={<MnistPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
