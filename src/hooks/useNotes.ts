import { useContext } from 'react';
import { NotesContext, NotesContextType } from '../contexts/note-context';

export const useNotes = (): NotesContextType => {
  const context = useContext(NotesContext);
  
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  
  return context;
};