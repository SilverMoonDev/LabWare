import ReactDOM from 'react-dom/client';
import Main from "./Main";
import './index.css'
import React from 'react';

const appElement = document.getElementById('app');
if (appElement) {
  ReactDOM.createRoot(appElement).render(
    <Main />
  );
}