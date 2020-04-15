import React from 'react';
import ReactDOM from 'react-dom';
import ReactPlayground from './ReactPlayground';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ReactPlayground />, div);
  ReactDOM.unmountComponentAtNode(div);
});
