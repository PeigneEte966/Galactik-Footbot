import React, { useState } from 'react';
import Icons from '../constants/icons.jsx';
import { darkModeColors, lightModeColors } from '../constants/styles.jsx';

const Sendbar = ({ addMessage, isDarkMode }) => {
  const [message, setMessage] = useState('');
  const currentColors = isDarkMode ? darkModeColors : lightModeColors;
  const transitionClass = "transition duration-300";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      addMessage(message);
      setMessage('');
    }
  };

  return (
    <div className={`w-full ${currentColors.background} ${transitionClass} flex justify-center py-4`}>
      <form onSubmit={handleSubmit} className="flex items-center space-x-4 w-full max-w-[200px] sm:max-w-[400px] md:max-w-[600px] lg:max-w-[800px]">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Écrire votre question..."
          className={`flex-grow p-2 rounded ${currentColors.onBackground} ${currentColors.textOnBackground} focus:outline-none focus:ring-1 ${currentColors.borderSecondary} ${transitionClass}`}
        />
        <button type="submit" className={`p-2 rounded ${currentColors.onBackground} ${currentColors.succes} ${currentColors.secondary} ${transitionClass}`}>
          <Icons.Send />
        </button>
      </form>
    </div>
  );
};

export default Sendbar;
