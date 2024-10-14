import React, { createContext, useState } from 'react';

// Create a context for global state
export const AvatarContext = createContext();

export const AvatarStateProvider = ({ children }) => {
  const [selectedGender, setSelectedGender] = useState('boy');
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  return (
    <AvatarContext.Provider value={{ selectedGender, setSelectedGender, selectedAvatar, setSelectedAvatar }}>
      {children}
    </AvatarContext.Provider>
  );
};
