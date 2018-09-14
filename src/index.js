import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'emotion-theming';
import store from './store';
import App from './components/App';

// Emotion theme
const theme = {
  primary: 'rgb(123, 217, 249)',
  accent: 'rgb(123, 249, 175)',
  black: 'rgb(37, 37, 37)',
};

render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
);
