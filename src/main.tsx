import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

const root = document.getElementById('root');
if (root) {
  if (root.hasChildNodes()) hydrateRoot(root, <App />, { onRecoverableError: (error, info) => console.error(error, info.componentStack) });
  else createRoot(root).render(<App />);
}
