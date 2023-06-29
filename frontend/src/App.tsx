import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from 'layout/header';
import AppRoutes from 'routes';

function App() {
  return (
    <div className="App">
      <Header/>
      <AppRoutes/>
    </div>
  );
}

export default App;
