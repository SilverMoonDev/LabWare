import ReactDOM from 'react-dom/client';
import React from 'react';
import { Update } from '../js/Pages/Update';
import './bootstrap';
import './styles/app.css';

const appElement = document.getElementById('update');
if (appElement) {
  ReactDOM.createRoot(appElement).render(
    <Update />
  );
}