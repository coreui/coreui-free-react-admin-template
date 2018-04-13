import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './Dashboard';

jest.mock('react-chartjs-2', () => ({
  Line: () => null,
  Bar: () => null,
}));

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Dashboard />, div);
  ReactDOM.unmountComponentAtNode(div);
});