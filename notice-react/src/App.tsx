import React from 'react';
import { Content } from './components/Content/Content';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import './styles/App.scss';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <Sidebar />
        <Content />
      </main>
    </div>
  );
}

export default App;
