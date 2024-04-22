import ReactDOM from 'react-dom/client';
import Main from "../js/Pages/Main";
import React from 'react';
import '../styles/index.css';

const appElement = document.getElementById('app');
if (appElement) {
  ReactDOM.createRoot(appElement).render(
    <Main />
  );
}