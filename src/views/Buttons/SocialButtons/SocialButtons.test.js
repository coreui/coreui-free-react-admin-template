import React from 'react';
import ReactDOM from 'react-dom';
import SocialButtons from './SocialButtons';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SocialButtons />, div);
  ReactDOM.unmountComponentAtNode(div);
});
