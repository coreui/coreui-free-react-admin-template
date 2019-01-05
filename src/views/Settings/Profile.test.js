import React from 'react';
import ReactDOM from 'react-dom';
import Profile from './Profile';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Profile />, div);
  ReactDOM.unmountComponentAtNode(div);
});
