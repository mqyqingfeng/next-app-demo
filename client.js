import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from'./pages/index'

hydrateRoot(document.getElementById('root'), <App />);