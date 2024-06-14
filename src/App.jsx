import React, { useState } from 'react';
import Sidebar from './components/sidebar';
import Messages from './components/messages';
import Sendbar from './components/sendbar';
import SuggestionModal from './components/suggestion';
import InformationModal from './components/informations';
import Notification from './components/notification';
import { darkModeColors, lightModeColors } from './constants/styles';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [isSuggestionModalOpen, setIsSuggestionModalOpen] = useState(false);
  const [isInformationModalOpen, setIsInformationModalOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const generateAnswer = async (message) => {
    try {
      const response = await fetch('http://172.20.10.2:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: message }),
      });
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error:', error);
      return 'Désolé, une erreur est survenue. Veuillez réessayer plus tard.';
    }
  };

  const sendPouce = async (message, response, isActive) => {
    try {
      const res = await fetch('http://172.20.10.2:5000/pouce', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pouce: {
            message: message,
            reponse: response,
            active : isActive,
          },
        }),
      });
      const data = await res.json();
      console.log('Pouce response:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const sendSuggestion = async (suggestion) => {
    try {
      const res = await fetch('http://172.20.10.2:5000/suggestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ suggestion: suggestion }),
      });
      const data = await res.json();
      console.log('Suggestion response:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDownVote = (message, response, isActive) => {
    console.log('Down vote isActive :', isActive);
    sendPouce(message, response, isActive);
  };


  const addMessage = async (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: 'question', text: message },
    ]);

    const responseText = await generateAnswer(message);

    setMessages((prevMessages) => [
      ...prevMessages,
      { type: 'answer', text: responseText },
    ]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const openSuggestionModal = () => {
    setIsSuggestionModalOpen(true);
  };

  const closeSuggestionModal = () => {
    setIsSuggestionModalOpen(false);
  };

  const openInformationModal = () => {
    setIsInformationModalOpen(true);
  };

  const closeInformationModal = () => {
    setIsInformationModalOpen(false);
  };

  const handleSendSuggestion = (message) => {
    sendSuggestion(message);
    setShowNotification(true); // Affiche la notification
    setTimeout(() => {
      setShowNotification(false); // Cache la notification après 2 secondes
    }, 2000);
    closeSuggestionModal(); // Fermer la modal après l'envoi
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const currentColors = isDarkMode ? darkModeColors : lightModeColors;

  return (
    <div className={`flex h-screen w-screen ${currentColors.background}`}>
      <Sidebar clearMessages={clearMessages} openModal={openSuggestionModal} openInformationModal={openInformationModal} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <div className="flex flex-col flex-grow">
        <div className="flex-grow min-h-[500px] overflow-hidden">
          <Messages messages={messages} isDarkMode={isDarkMode} handleDownVote={handleDownVote} />
        </div>
        <Sendbar addMessage={addMessage} isDarkMode={isDarkMode} />
      </div>
      <SuggestionModal isOpen={isSuggestionModalOpen} onClose={closeSuggestionModal} onSend={handleSendSuggestion} isDarkMode={isDarkMode} />
      <InformationModal isOpen={isInformationModalOpen} onClose={closeInformationModal} isDarkMode={isDarkMode} />
      <Notification show={showNotification} message="Suggestion envoyée avec succès!" />
    </div>
  );
};

export default App;
