import { FC, useContext } from 'react';
import classNames from 'classnames';
import { Note } from '../../types/Note';
import { AppContext } from '../../Context/context';

type Props = {
  note: Note,
};

export const ListItem: FC<Props> = ({ note }) => {
  const { setSelectedNote, selectedNote } = useContext(AppContext);
  const {
    id,
    title,
    text,
    date,
    lock,
  } = note;
  const dateFormat = () => {
    const dateObj = new Date(date);
    const currentDay = (new Date()).getDate();    
    const timeString = dateObj.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const amPm = dateObj.toLocaleTimeString([], {
      hour: '2-digit',
      minute:'2-digit',
      hour12: true,
    }).slice(-2).toLocaleUpperCase();

    return dateObj.getDate() === currentDay
      ? `${timeString} ${amPm}`
      : `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear().toString().slice(-2)}`;
  }

  return (
    <li
      className={classNames({
        'notes__item': true,
        'notes__item--active': id === selectedNote?.id,
      })}
      onClick={() => setSelectedNote(note)}
    >
      <div className={classNames({
        'notes__icon': true,
        'notes__icon--active': lock,
      })} />
      <div className="notes__card">
        <p className="notes__title">{title}</p>
        <p className="notes__subTitle">
          <span className="notes__time">{dateFormat()}</span>
          &nbsp;
          {text}
        </p>
      </div>
    </li>
  );
};
