import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import App from '../src/components/App';

storiesOf('App', module).add('with text', () => <App />);
