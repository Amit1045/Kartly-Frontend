import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Navbar from "./components/Navbar";
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import EditCard from './pages/EditCard';
import BuyProduct from './pages/BuyProduct';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

function App() {
  const [isLight, setIsLight] = useState(false); // State to control global background

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        isLight ? "bg-white" : "bg-gray-900"
      }`}
    >
      <Navbar isLight={isLight} setIsLight={setIsLight} />
      <Routes>
        <Route path="/" element={<SignUp isLight={isLight}  />} />
        <Route path="/signup" element={<SignUp isLight={isLight}  />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage isLight={isLight} setIsLight={setIsLight} />} />
        <Route path="/create" element={<CreatePage isLight={isLight}/>} />
        <Route path="/edit/:id" element = {<EditCard isLight={isLight} />}/>
        <Route path="/buy/:id" element={<BuyProduct isLight={isLight} />} />
      </Routes>
    </div>
  );
}

export default App;
