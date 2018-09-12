import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { injectGlobal } from 'emotion';
import { ThemeProvider } from 'emotion-theming';
import rootReducer from './store/rootReducer';
import App from './components/App';

// Global styles
injectGlobal`
  body {
    color: rgb(37, 37, 37);
    font-family: sans-serif;
    margin: 0;
  }
`;

// Simple root element for app
const rootEl = document.createElement('div');
document.body.append(rootEl);

// Redux stuff
const composeEnhancers =
  process.env.NODE_ENV === 'production'
    ? compose
    : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(),
  applyMiddleware(thunk),
);

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
  rootEl,
);
