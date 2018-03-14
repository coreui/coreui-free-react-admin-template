import React from 'react';
import ReactDOM from 'react-dom';
import FullAside from '../FullAside';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FullAside />, div);
  ReactDOM.unmountComponentAtNode(div);
});
