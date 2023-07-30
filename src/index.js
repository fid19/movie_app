import React from 'react';
import { createRoot } from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './app/store';
import ToggleColorMode from './utils/ToggleColorMode';

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ToggleColorMode><BrowserRouter><App /></BrowserRouter></ToggleColorMode>
  </Provider>,
);
