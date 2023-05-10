import { useContext } from "react";
import { AppContext } from "../../Context/context";

export const Content = () => {
  const { selectedNote: note } = useContext(AppContext);
  const getFormatDate = () => {
    if (!note) {
      return '';
    }

    return (new Date(note?.date)).toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  return (
    <section className="content">
      {note && (
        <>
          <p className="content__time">{getFormatDate()}</p>
          <p className="content__title">{note.title}</p>
          <br />
          <p className="content__subTitle">{note.text}</p>
        </>
      )}
    </section>
  );
};
