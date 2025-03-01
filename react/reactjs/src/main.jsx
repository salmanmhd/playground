import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
// import App from './App.jsx';
// import TaskManager from './Task.jsx';
// import Example from './Example.jsx';
import AddressToPdf from './Address.jsx';
import Thoughts from './Thoughts.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <TaskManager /> */}
    {/* <Example /> */}
    {/* <AddressToPdf /> */}
    <Thoughts />
  </StrictMode>
);
