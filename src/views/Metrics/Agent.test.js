import React from 'react';
import ReactDOM from 'react-dom';
import Agent from './Agent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Agent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
