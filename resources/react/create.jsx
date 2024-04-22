import './bootstrap';
import './styles/app.css';

import ReactDOM from 'react-dom/client';
import React from 'react';
import { Create } from '../js/Pages/Create';

const appElement = document.getElementById('create');
if (appElement) {
  ReactDOM.createRoot(appElement).render(
    <Create />
  );
}