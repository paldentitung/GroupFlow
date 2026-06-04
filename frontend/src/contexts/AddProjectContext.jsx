import { useContext } from "react";
import { createContext, useState } from "react";

const AddProjectContext = createContext();

export const AddProjectProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <AddProjectContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
      }}
    >
      {children}
    </AddProjectContext.Provider>
  );
};

export const useAddProject = () => useContext(AddProjectContext);
