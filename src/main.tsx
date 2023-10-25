import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import store, { persister } from './store';
import GlobalStyle from './styles/global-style.ts';
import { PersistGate } from 'redux-persist/integration/react';

const root = document.getElementById('root') as HTMLDivElement;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persister} loading={null}>
        <GlobalStyle />
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
