import React from 'react';
import ReactDOM from 'react-dom';
import FullHeader from '../FullHeader';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FullHeader />, div);
  ReactDOM.unmountComponentAtNode(div);
});
