export const Header = () => (
  <header className="header">
    <div className="container">
      <div className="header__container">
        <div className="header__buttons">
        <button className="button button--add" />
        <button className="button button--delete" disabled />
        <button className="button button--notice" disabled></button>

      </div>

      <input placeholder="&#x1F50D; Search" type="text" className="header__search" />
      </div>
    </div>
  </header>
);
