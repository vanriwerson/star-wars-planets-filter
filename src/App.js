import React from 'react';
import './App.css';
import NumericFilter from './components/NumericFilter';
import Table from './components/Table';
import TextFilter from './components/TextFilter';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <h1>STAR WARS</h1>
      <p>Planets Search</p>
      <TextFilter />
      <NumericFilter />
      <Table />
    </Provider>
  );
}

export default App;
