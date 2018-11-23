import React from 'react';
import Colors from './Colors';
import { mount } from 'enzyme'

it('renders without crashing', () => {
  mount(<Colors />);
});
