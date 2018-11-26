import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme'
import Dropdowns from './Dropdowns';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Dropdowns />, div);
  ReactDOM.unmountComponentAtNode(div);
});
it('toggle click without crashing', () => {
  const wrapper = mount(<Dropdowns />);
  for (let i=0; i<5; i++) {
    let Dropdown = wrapper.find('button.dropdown-toggle').at(i);
    Dropdown.simulate('click');
    expect(wrapper.state().dropdownOpen[i]).toEqual(true);
  }
  for (let i=0; i<2; i++) {
    let Dropdown = wrapper.find('[data-toggle="dropdown"]').at(0);
    Dropdown.simulate('click');
    expect(wrapper.state().dropdownOpen[5]).toEqual(true);
    let DropdownItem = wrapper.find('div.dropdown-menu > .dropdown-item').at(i);
    DropdownItem.simulate('click');
    expect(wrapper.state().dropdownOpen[5]).toEqual(false);
  }
  wrapper.unmount()
});
