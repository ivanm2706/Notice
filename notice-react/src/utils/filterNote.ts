import { Note } from "../types/Note"

export const filterNotes = (notes: Note[], query: string): Note[] => {
  return query
    ? notes.filter(({ title }) => title.includes(query))
    : notes;
};
