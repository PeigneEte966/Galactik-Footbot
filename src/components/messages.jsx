import React, { useEffect, useRef, useState } from 'react';
import Bubble from './bubble';
import robot from '../assets/robot.png';
import robot2 from '../assets/robot2.png';
import { darkModeColors, lightModeColors } from '../constants/styles.jsx';

const Messages = ({ messages, isDarkMode, handleDownVote }) => {
  const messagesEndRef = useRef(null);
  const [isRobot2Visible, setIsRobot2Visible] = useState(false);
  const currentColors = isDarkMode ? darkModeColors : lightModeColors;
  const transitionClass = "transition duration-300";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleRobotClick = () => {
    setIsRobot2Visible(true);
    setTimeout(() => {
      setIsRobot2Visible(false);
    }, 300);
  };

  return (
    <div className={`relative w-full flex flex-col h-full border rounded-lg ${transitionClass} ${currentColors.backgroundSecondary} ${currentColors.border}`}>
      <div className={`flex justify-center bg-transparent items-center mt-[12px] z-10`}>
        <button className={`bg-transparent focus:outline-none`} onClick={handleRobotClick}>
          <img
            src={isRobot2Visible ? robot2 : robot}
            alt="Robot"
            className="h-[128px] w-[128px] cursor-pointer"
          />
        </button>
      </div>
      <div className={`flex-grow p-4 overflow-y-auto rounded-xl bg-transparent`}>
        <div className="flex flex-col justify-end min-h-full relative">
          {messages.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center p-4 z-0">
              <p className={`text-center ${currentColors.textOnBackground} ${transitionClass} opacity-25 text-[64px]`}>Bienvenue sur Galactik Footbot !</p>
            </div>
          ) : (
            <>
              {messages.map((msg, index) => (
                <Bubble key={index} type={msg.type} text={msg.text} index={index} messages={messages} handleDownVote={handleDownVote} isDarkMode={isDarkMode} />
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
