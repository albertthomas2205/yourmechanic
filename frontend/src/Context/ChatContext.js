import { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [selectedMechanicId, setSelectedMechanicId] = useState(null);
  const [userId, setUserId] = useState(null);

  const setMechanicId = (mechanicId) => {
    setSelectedMechanicId(mechanicId);
  };
  const setUserIdToContext = (id) => {
    setUserId(id);
  };

  return (
    <ChatContext.Provider value={{ selectedMechanicId, setMechanicId , userId, setUserIdToContext}}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);
