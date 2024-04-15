import ReactDOM from 'react-dom/client';
import React from 'react';
import { Create } from './components/Create';
import './styles/index.css';

const appElement = document.getElementById('create');
if (appElement) {
  ReactDOM.createRoot(appElement).render(
    <Create />
  );
}