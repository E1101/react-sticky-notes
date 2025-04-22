import React, { createContext, useState, useEffect, ReactNode } from "react";
import { Note } from "../types/note";
import { db } from "../infrastructure/appwrite/db";
import LoadingSpinner from "../components/ui/LoadingSpinner";

// import { fakeData as notes } from "../assets/fake-data";

export interface NotesContextType {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  activeNoteId: string | null;
  setActiveNoteId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const NotesContext = createContext<NotesContextType | undefined>(
  undefined
);

interface NotesProviderProps {
  children: ReactNode;
}

export const NotesProvider: React.FC<NotesProviderProps> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

  const init = async () => {
    try {
      setIsLoading(true);
      const documents = await db.notes.list();
      setNotes(documents);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const context = {
    notes,
    setNotes,
    activeNoteId,
    setActiveNoteId,
  };

  return (
    <NotesContext.Provider value={context}>
      {isLoading ? <LoadingSpinner /> : children}
    </NotesContext.Provider>
  );
};
