import React, { useCallback, useContext, useEffect, useState } from 'react';
import { notesAPI } from './API/notesAPI';
import { fetchNotes } from './APIquintadb/fetch';
import { Content } from './components/Content/Content';
import { Header } from './components/Header/Header';
import { Modal } from './components/Modal';
import { Sidebar } from './components/Sidebar/Sidebar';
import { AppContext } from './Context/context';
import './styles/App.scss';
import { IsModal } from './types/IsModal';
import { Note } from './types/Note';

function App() {
  const [isModal, setIsModal] = useState<IsModal>({
    status: false,
    target: null,
  });
  const { setNotes, selectedNote, setSelectedNote } = useContext(AppContext);

  const foo = () => {
    // notesAPI.getAll()
    fetchNotes.getAll()
      .then(setNotes);
  };

  const addNote = useCallback(() => {
    const newNote: Note = {
      title: 'Title...',
      id: Date.now(),
      text: 'Write some text...',
      date: (new Date()).toString(),
      lock: false,
    };

    fetchNotes.add(newNote)
      .then(() => {
          foo();
        });

    // notesAPI.add(newNote)
    //   .then(() => {
    //     foo();
    //   });
  }, []);

  const deleteNote = useCallback(() => {
    if (!selectedNote) {
      return;
    }

    fetchNotes.delete(selectedNote.id)
      .then(() => {
        setSelectedNote(null);
        foo();
      });

    // notesAPI.delete(selectedNote.id)
    //   .then(() => {
    //     setSelectedNote(null);
    //     foo();
    //   });
  }, [selectedNote]);

  const changeNote = useCallback((title: string, text: string, lock: boolean) => {
    if (!selectedNote) {
      return;
    }
    const newdata = {
      title,
      text,
      lock,
      date: (new Date()).toString(),
    };

    fetchNotes.change(selectedNote.id, newdata)
      .then(() => {
          foo();
          setSelectedNote(null);
        })

    // notesAPI.change(selectedNote.id, newdata)
    //   .then(() => {
    //     foo();
    //     setSelectedNote(null);
    //   })
  }, [selectedNote]);

  useEffect(() => {
    foo();
  }, []);

  return (
    <div className="app">
      <Header
        openModal={setIsModal}
        addNote={addNote}
      />
      <main className="main">
        <Sidebar />
        <Content />
      </main>

      {isModal.status && (
        <Modal
          closeModal={setIsModal}
          deleteNote={deleteNote}
          target={isModal.target}
          changeNote={changeNote}
        />
      )}
    </div>
  );
}

export default App;
