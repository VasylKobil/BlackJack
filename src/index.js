import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App/App';
import reportWebVitals from './reportWebVitals';
import DeckContextProvider from "./Components/Context/ContextConfirm";

ReactDOM.render(
  <React.StrictMode>
      <DeckContextProvider>
          <App />
      </DeckContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();