import React, { createContext, ReactNode, useState } from 'react';
import { Note } from '../types/Note';

interface AppContextType {
  selectedNote: Note | null,
  setSelectedNote: React.Dispatch<React.SetStateAction<Note | null>>,
  notes: Note[],
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>,
  query: string,
  setQuery: React.Dispatch<React.SetStateAction<string>>,
}

export const AppContext = createContext<AppContextType>({
  selectedNote: null,
  notes: [],
  setSelectedNote: () => {},
  setNotes: () => {},
  setQuery: () => {},
  query: '',
});


export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [query, setQuery] = useState('');

  const value = {
    notes,
    selectedNote,
    setNotes,
    setSelectedNote,
    query,
    setQuery,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
