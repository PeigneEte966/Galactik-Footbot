import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Icons from '../constants/icons.jsx';
import { darkModeColors, lightModeColors } from '../constants/styles.jsx';

const Bubble = ({ type, text, index, messages, isDarkMode, handleDownVote }) => {
  const isQuestion = type === 'question';
  const currentColors = isDarkMode ? darkModeColors : lightModeColors;
  const transitionClass = "transition duration-300";

  const [vote, setVote] = useState(null);
  const [isActive, setIsActive] = useState(false);

  const handleUpVote = () => {
    setVote(vote === 'up' ? null : 'up');
  };

  const handleDownVoteClick = () => {
    const previousMessage = messages[index - 1];
    const newIsActive = !isActive;
    handleDownVote(previousMessage.text, text, newIsActive);  // Passez newIsActive à handleDownVote
    setVote(vote === 'down' ? null : 'down');
    setIsActive(newIsActive);  // Inverse la valeur de isActive
  };

  return (
    <div className={`flex space-x-2 ${isQuestion ? 'justify-end' : 'justify-start'} my-2`}>
      <div
        className={`${transitionClass} max-w-full sm:max-w-[300px] md:max-w-[500px] lg:max-w-[700px] xl:max-w-[1000px] p-4 break-words whitespace-pre-wrap ${
          isQuestion 
            ? `${currentColors.primary} ${currentColors.button} text-[20px] rounded-tl-[20px] rounded-tr-[20px] rounded-bl-[20px] rounded-br-none text-right`
            : `${currentColors.test2} ${currentColors.test} text-[20px] rounded-tl-[20px] rounded-tr-[20px] rounded-bl-none rounded-br-[20px] text-left`
        }`}
      >
        {text}
      </div>

      {!isQuestion && (
        <div className={`flex items-center ${transitionClass}`}>
          <button onClick={handleUpVote} className="focus:outline-none bg-transparent">
            {vote === 'up' ? (
              <Icons.ThumbUp className={`${currentColors.succesText}`} />
            ) : (
              <Icons.ThumbUpAltOutlined className={`${currentColors.secondary}`}/>
            )}
          </button>
          <button onClick={handleDownVoteClick} className="focus:outline-none bg-transparent">
            {isActive ? (
              <Icons.ThumbDown className={`${currentColors.errorText}`} />
            ) : (
              <Icons.ThumbDownAltOutlined className={`${currentColors.secondary}`} />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

Bubble.propTypes = {
  type: PropTypes.oneOf(['question', 'answer']).isRequired,
  text: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  messages: PropTypes.array.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  handleDownVote: PropTypes.func.isRequired,
};

export default Bubble;
