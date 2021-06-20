import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStateProvider from "store/GlobalStateProvider";
import './index.scss';
import App from './App';

ReactDOM.render(
  <GlobalStateProvider>
    <App />
  </GlobalStateProvider>,
  document.getElementById('root')
);
