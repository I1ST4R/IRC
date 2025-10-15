import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'; 
import './index.css';

const initApp = async () => {
  // Сначала импортируем store
  const { store } = await import('../store');
  // Потом App
  const App = (await import('../App')).default;
  
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter> 
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
  );
};

initApp();