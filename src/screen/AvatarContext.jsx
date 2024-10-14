import React, { createContext, useState, useMemo } from 'react';

// Create a context for global state
export const AvatarContext = createContext();

export const AvatarStateProvider = ({ children }) => {
  const [selectedGender, setSelectedGender] = useState('boy');
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const contextValue = useMemo(() => ({
    selectedGender,
    setSelectedGender,
    selectedAvatar,
    setSelectedAvatar,
  }), [selectedGender, selectedAvatar]);

  return (
    <AvatarContext.Provider value={contextValue}>
      {children}
    </AvatarContext.Provider>
  );
};
