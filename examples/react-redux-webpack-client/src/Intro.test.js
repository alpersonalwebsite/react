/*
import React from 'react';
import ReactDOM from 'react-dom';
import Intro from './Intro';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Intro />, div);
});
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import Intro from './Intro';

describe('<Intro />', () => {
  const wrapper = mount(<Intro />);

  it('matches the previous Snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('has a h1 as title with class title', () => {
    expect(wrapper.find('h1').exists()).toBe(true);
  });
});
