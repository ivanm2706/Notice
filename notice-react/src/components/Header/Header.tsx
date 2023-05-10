import { FC, useContext } from 'react';
import { AppContext } from '../../Context/context';
import { IsModal } from '../../types/IsModal';
import { Search } from './Search';

type Props = {
  addNote: () => void,
  openModal: React.Dispatch<React.SetStateAction<IsModal>>,
}

export const Header: FC<Props> = ({
  addNote,
  openModal,
}) => {
  const { selectedNote } = useContext(AppContext);

  const hendlerAddNote = () => {
    addNote();
  };

  const hendlerRemoveNote = () => {
    openModal({ status: true, target: 'delete' });
  };

  const hendlerChangeNote = () => {
    openModal({ status: true, target: 'change' });
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__container">
          <div className="header__buttons">
          <button
            className="button button--add"
            onClick={hendlerAddNote}
          />
          <button
            className="button button--delete"
            onClick={hendlerRemoveNote}
            disabled={!selectedNote}
          />
          <button
            className="button button--notice"
            onClick={hendlerChangeNote}
            disabled={!selectedNote}
          ></button>

        </div>

        <Search />
        </div>
      </div>
    </header>
  );
};
