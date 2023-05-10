import { FC, useContext, useState } from 'react';
import { AppContext } from '../Context/context';
import { IsModal } from "../types/IsModal";

type Props = {
  closeModal: React.Dispatch<React.SetStateAction<IsModal>>,
  target: 'delete' | 'change' | null;
  deleteNote: () => void,
  changeNote: (title: string, text: string, lock: boolean) => void,
}
export const Modal: FC<Props> = ({
  target,
  deleteNote,
  closeModal,
  changeNote,
}) => {
  const { selectedNote } = useContext(AppContext);
  const [title, setTitle] = useState<string>(selectedNote?.title || '');
  const [text, setText] = useState<string>(selectedNote?.text || '');
  const [isChecked, setIsChecked] = useState(selectedNote?.lock || false);

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIsChecked(e.target.checked);
  }

  const hendlerChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const hendlerChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
 
  const hendlerDelete = () => {
    deleteNote();
    close();
  };

  const hendlerUpdated = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    changeNote(title, text, isChecked);
    close();
  };

  const close = () => {
    closeModal({ target: null, status: false })
  }

  return (
    <div className="modal">
      <div className="modal__container">
        {(target === 'change') && (
          <form
            className="modal__form"
            onSubmit={hendlerUpdated}
          >
            <label className="modal__label" htmlFor="title">Title</label>
            <input 
              type="text"
              id="title"
              className="modal__input"
              value={title}
              onChange={hendlerChangeTitle}
            />
            
            <label className="modal__label" htmlFor="subTitle">Content</label>
            <textarea
              id="subTitle"
              className="modal__input modal__input--textarea"
              value={text}
              onChange={hendlerChangeText}
            />

            <div className="modal__contaierCheckbox">
              <label className="modal__label" htmlFor="private">Lock</label>
              <input
                type="checkbox"
                id="private"
                className="modal__checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
            </div>
            <button type="submit" className="modal__button">Create</button>
          </form>
        )}

        {target === 'delete' && (
          <>
            <p className="modal__question">Are You sure?</p>
            <div className="modal__buttons">
              <button
                type="button"
                className="modal__button"
                onClick={hendlerDelete}
              >
                Yes
              </button>
              <button
                type="button"
                className="modal__button"
                onClick={close}
              >
                No
              </button>
            </div>
          </>
        )}
        
        <button
          type="button"
          className="modal__cross"
          onClick={close}
        >
          X
        </button>
      </div>
    </div>
  );
};
