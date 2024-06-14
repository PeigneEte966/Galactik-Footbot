import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { darkModeColors, lightModeColors } from '../constants/styles.jsx';
import { teamMembers, description } from '../constants/texts.jsx';

const InformationModal = ({ isOpen, onClose, isDarkMode }) => {
  const [animationClass, setAnimationClass] = useState('');
  const [hoveredMember, setHoveredMember] = useState(null);
  const currentColors = isDarkMode ? darkModeColors : lightModeColors;

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
      <div className={`rounded-lg p-6 w-full max-w-3xl h-grow max-h-[500px] flex flex-col space-y-[20px] transform transition-transform duration-300 border ${currentColors.background} ${currentColors.border} ${animationClass}`}>
        <p className={`text-xl ${currentColors.textOnBackground} ${currentColors.border} ${currentColors.backgroundSecondary} border rounded-lg p-4 h-full text-center`}>
          {description}
        </p>
        <div className="flex justify-around">
          {teamMembers.map((member, index) => (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredMember(index)}
              onMouseLeave={() => setHoveredMember(null)}
              className={`flex flex-col items-center p-4 rounded-lg space-y-[12px] transition duration-300 ${hoveredMember === index ? currentColors.backgroundSecondary : ''}`}
              key={member.name}
            >
              <img src={member.image} alt={member.name} className="rounded-full w-32 h-32" />
              <span className={`${currentColors.textOnBackground} text-xl`}>{member.name}</span>
            </a>
          ))}
        </div>
        <div className="flex justify-center">
          <button
            className={`rounded-lg transition-colors duration-300 ${currentColors.textOnBackground} ${currentColors.onBackground} ${currentColors.border} ${currentColors.error}`}
            onClick={onClose}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default InformationModal;
