import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';

hydrateRoot(document.getElementById('root'), <App />);
