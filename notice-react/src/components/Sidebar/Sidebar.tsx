import { useContext, useMemo } from 'react';
import { AppContext } from "../../Context/context";
import { filterNotes } from '../../utils/filterNote';
import { ListItem } from './ListItem';

export const Sidebar = () => {
  const { notes, query } = useContext(AppContext);

  const visibleNotes = useMemo(
    () => filterNotes(notes, query),
    [query, notes],
  );

  return (
    <aside className="notes">
      <ul className="notes__list">
        {visibleNotes.map(note => (
          <ListItem key={note.id} note={note} />
        ))}
      </ul>
    </aside>
  );
};
