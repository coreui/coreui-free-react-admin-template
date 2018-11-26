import React from 'react';
import ReactDOM from 'react-dom';
import Navs from './Navs';
import {mount} from 'enzyme/build';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Navs />, div);
  ReactDOM.unmountComponentAtNode(div);
});
it('toggle click without crashing', () => {
  const wrapper = mount(<Navs />);
  for (let i=0; i<2; i++) {
    let Nav = wrapper.find('a.dropdown-toggle').at(i);
    Nav.simulate('click');
    expect(wrapper.state().dropdownOpen[i]).toEqual(true);
  }
  wrapper.unmount()
});
