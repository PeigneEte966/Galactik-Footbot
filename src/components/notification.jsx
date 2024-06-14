// src/components/Notification.jsx

import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

const Notification = ({ show, message }) => {
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      in={show}
      timeout={300}
      nodeRef={nodeRef}
      classNames={{
        enter: 'opacity-0',
        enterActive: 'opacity-100 transition-opacity duration-300',
        exit: 'opacity-100',
        exitActive: 'opacity-0 transition-opacity duration-300',
      }}
      unmountOnExit
    >
      <div ref={nodeRef} className="fixed top-0 left-0 right-0 bg-green-500 text-white p-4 z-50 text-center">
        {message}
      </div>
    </CSSTransition>
  );
};

export default Notification;
