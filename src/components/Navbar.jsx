import React from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SunnyIcon from '@mui/icons-material/Sunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Link } from 'react-router-dom';
function Navbar({ isLight, setIsLight }) {
  return (
    <div
      className={`max-w-6xl mx-auto px-4 flex justify-between items-center h-16 shadow-md`}>
      <Link to="/home">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Kartly 🛒</h1>
      </Link>
      <div className="flex gap-2">
        <Link to="/create">
          <button className="px-3  rounded-2xl text-violet-500 hover:text-cyan-300">
            <AddBoxIcon />
          </button>
        </Link>
        <button
          className="px-3 text-violet-500  hover:text-cyan-300"
          onClick={() => setIsLight((prev) => !prev)}
        >
          {isLight ? <DarkModeIcon /> : <SunnyIcon />}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
