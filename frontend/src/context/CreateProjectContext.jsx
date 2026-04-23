import { createContext, useContext, useState } from "react";

const CreateProjectContext = createContext(null);

export function CreateProjectProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <CreateProjectContext.Provider value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}>
      {children}
    </CreateProjectContext.Provider>
  );
}

export function useCreateProject() {
  return useContext(CreateProjectContext);
}
