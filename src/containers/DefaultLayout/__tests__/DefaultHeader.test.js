import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import DefaultHeader from '../DefaultHeader';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><DefaultHeader /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
