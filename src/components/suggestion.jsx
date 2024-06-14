import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { darkModeColors, lightModeColors } from '../constants/styles.jsx';

const SuggestionModal = ({ isOpen, onClose, onSend, isDarkMode }) => {
  const [message, setMessage] = useState('');
  const [animationClass, setAnimationClass] = useState('');
  const currentColors = isDarkMode ? darkModeColors : lightModeColors;

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSend = () => {
    if (message.trim() !== '') {
      onSend(message);
      setMessage('');
    }
  };

  useEffect(() => {
    if (isOpen) {
      setAnimationClass('opacity-25 scale-75');
      setTimeout(() => {
        setAnimationClass('opacity-100 scale-100');
      }, 1);
    } else {
      setAnimationClass('opacity-25 scale-75');
      setTimeout(onClose, 300);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className={`fixed inset-0 ${currentColors.background} bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300`}>
      <div className={`border rounded-lg p-6 w-full max-w-xl h-[500px] space-y-[20px] flex flex-col transform transition-transform duration-300 ${currentColors.background} ${currentColors.border} ${animationClass}`}>
        <p className={`text-2xl  ${currentColors.textOnBackground}`}>Envoyer une suggestion</p>
        <textarea
          className={`w-full flex-grow p-2 border rounded ${currentColors.borderSecondary} ${currentColors.textOnBackground} ${currentColors.onBackground} ${currentColors.border}`}
          placeholder="Écrivez votre suggestion ici..."
          value={message}
          onChange={handleChange}
        ></textarea>
        <div className="flex justify-end space-x-[20px]">
          <button
            className={`border rounded-lg ${currentColors.error} transition-colors duration-300 ${currentColors.textOnBackground} ${currentColors.onBackground} ${currentColors.border}`}
            onClick={onClose}
          >
            Fermer
          </button>
          <button
            className={`${currentColors.succes} border rounded-lg transition-colors duration-300 ${currentColors.textOnBackground} ${currentColors.onBackground} ${currentColors.border} ${message.trim() === '' ? 'opacity-70 cursor-not-allowed' : ''}`}
            onClick={handleSend}
            disabled={message.trim() === ''}
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SuggestionModal;
