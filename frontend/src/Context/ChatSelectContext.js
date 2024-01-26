import { useState, createContext } from "react";
export const ChatSelectContextt = createContext();

const ChatSelectt = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState("");
  return (
    <ChatSelectContextt.Provider value={{ selectedChat, setSelectedChat }}>
      {children}
    </ChatSelectContextt.Provider>
  );
};

export default ChatSelectt;
