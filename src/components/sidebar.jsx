import React, { useState } from 'react';
import Icons from '../constants/icons.jsx';
import logo from '../assets/logo.png';
import { darkModeColors, lightModeColors } from '../constants/styles.jsx';

const Sidebar = ({ clearMessages, openModal, openInformationModal, isDarkMode, toggleTheme }) => {
  const currentColors = isDarkMode ? darkModeColors : lightModeColors;
  const [darkMode, setDarkMode] = useState(isDarkMode);
  const transitionClass = "transition duration-300";



  const handleToggleTheme = () => {
    setDarkMode(!darkMode);
    toggleTheme();
  };

  return (
    <div className={`h-screen max-w-[150px] sm:max-w-[200px] md:max-w-[225px] flex flex-col items-center ${currentColors.background} ${transitionClass} p-[12px]`}>
      <div className="my-8">
        <a href="https://www.youtube.com/channel/UCS6TtXBMZ1NfYZ3wKzgzw8A" target="_blank" rel="noopener noreferrer">
          <img
            src={logo}
            alt="Logo"
            className="rounded-[20px] max-h-[96px] max-w-[96px] md:max-h-[128px] md:max-w-[128px] hover:opacity-75 transition-opacity duration-300"
          />
        </a>
      </div>

      <div className="flex-grow flex flex-col justify-between items-center">
        <div className="flex flex-col space-y-12 mt-4">
          <button onClick={openModal} className={`hover:opacity-75 transition-opacity duration-300 ${currentColors.button}`}>
            <Icons.TipsAndUpdates className={`custom-icon ${currentColors.primary} ${transitionClass}`} />
          </button>
          <button onClick={handleToggleTheme} className={`hover:opacity-75 transition-opacity duration-300 ${currentColors.button} ${transitionClass}`}>
            {darkMode ? (
              <Icons.DarkMode className={`custom-icon ${currentColors.primary}`} />
            ) : (
              <Icons.LightMode className={`custom-icon ${currentColors.primary}`} />
            )}
          </button>
          <button onClick={clearMessages} className={`hover:opacity-75 transition-opacity duration-300 ${currentColors.button} ${transitionClass}`}>
            <Icons.DeleteForever className={`custom-icon ${currentColors.primary}`} />
          </button>
        </div>
        <div className="mb-12">
          <button onClick={openInformationModal} className={`hover:opacity-75 transition-opacity duration-300 ${currentColors.button} ${transitionClass}`}>
            <Icons.Quiz className={`custom-icon ${currentColors.primary}`} />
          </button>
        </div>
      </div>
      <style>
        {`
          .custom-icon {
            font-size: 48px;
          }
        `}
      </style>
    </div>
  );
};

export default Sidebar;
