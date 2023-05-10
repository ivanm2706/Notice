import { useContext } from 'react';
import { AppContext } from '../../Context/context';

export const Search = () => {
  const { query, setQuery } = useContext(AppContext);

  const hendlerInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(target.value);
  }

  return (
    <input
      placeholder="&#x1F50D; Search"
      type="text"
      className="header__search"
      value={query}
      onChange={hendlerInput}
    />
  );
};
