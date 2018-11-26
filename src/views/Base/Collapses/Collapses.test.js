import React from 'react';
import ReactDOM from 'react-dom';
import Collapses from './Collapses';
import {mount} from 'enzyme/build';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Collapses />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('toggle clicks', function() {
  it('collapse without crashing', () => {
    const wrapper = mount(<Collapses />);
    let collapse = wrapper.find('#toggleCollapse1').at(0);
    collapse.simulate('click');
    expect(wrapper.state().collapse).toEqual(true);
    collapse.simulate('click');
    expect(wrapper.state().collapse).toEqual(false);
    collapse.simulate('click');
    expect(wrapper.state().collapse).toEqual(true);
    wrapper.unmount()
  });
  it('fade without crashing', () => {
    const wrapper = mount(<Collapses />);
    let fade = wrapper.find('#toggleFade1').at(0);
    fade.simulate('click');
    expect(wrapper.state().fadeIn).toEqual(false);
    fade.simulate('click');
    expect(wrapper.state().fadeIn).toEqual(true);
    wrapper.unmount()
  });
  it('accordion without crashing', () => {
    const wrapper = mount(<Collapses />);
    let accordion = wrapper.find('[aria-controls="collapseOne"]').at(0);
    accordion.simulate('click');
    expect(wrapper.state().accordion[0]).toEqual(false);
    expect(wrapper.state().accordion[1]).toEqual(false);
    expect(wrapper.state().accordion[2]).toEqual(false);
    accordion = wrapper.find('[aria-controls="collapseTwo"]').at(0);
    accordion.simulate('click');
    expect(wrapper.state().accordion[0]).toEqual(false);
    expect(wrapper.state().accordion[1]).toEqual(true);
    expect(wrapper.state().accordion[2]).toEqual(false);
    accordion = wrapper.find('[aria-controls="collapseThree"]').at(0);
    accordion.simulate('click');
    expect(wrapper.state().accordion[0]).toEqual(false);
    expect(wrapper.state().accordion[1]).toEqual(false);
    expect(wrapper.state().accordion[2]).toEqual(true);
    accordion = wrapper.find('[aria-controls="collapseOne"]').at(0);
    accordion.simulate('click');
    expect(wrapper.state().accordion[0]).toEqual(true);
    expect(wrapper.state().accordion[1]).toEqual(false);
    expect(wrapper.state().accordion[2]).toEqual(false);
    wrapper.unmount()
  });
  it('custom without crashing', () => {
    const wrapper = mount(<Collapses />);
    let accordion = wrapper.find('[aria-controls="exampleAccordion1"]').at(0);
    accordion.simulate('click');
    expect(wrapper.state().custom[0]).toEqual(false);
    expect(wrapper.state().custom[1]).toEqual(false);
    accordion = wrapper.find('[aria-controls="exampleAccordion1"]').at(0);
    accordion.simulate('click');
    expect(wrapper.state().custom[0]).toEqual(true);
    expect(wrapper.state().custom[1]).toEqual(false);
    accordion = wrapper.find('[aria-controls="exampleAccordion2"]').at(0);
    accordion.simulate('click');
    expect(wrapper.state().custom[0]).toEqual(false);
    expect(wrapper.state().custom[1]).toEqual(true);
    wrapper.unmount()
  });
});
