import React from 'react';
import ReactDOM from 'react-dom';
import FullFooter from '../FullFooter';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FullFooter />, div);
  ReactDOM.unmountComponentAtNode(div);
});
