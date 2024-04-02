import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import storeSlice from './appRedux/slices/storeSlice';
import { createStore } from '@reduxjs/toolkit';

function Main() {
  // const store = createStore(storeSlice);

  return (
    // <DndProvider backend={HTML5Backend}>
      <React.StrictMode>
      
            <App />
        
       
      </React.StrictMode>
    // </DndProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
