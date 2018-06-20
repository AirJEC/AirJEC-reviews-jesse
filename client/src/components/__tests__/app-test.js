import React from 'react';
import { shallow } from 'enzyme';
import App from '../app';

describe('App Component', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<App />).find('#app').exists()).toBe(true);
  });
  it('renders a search input', () => {
    expect(shallow(<App />).find('#search').length).toEqual(1);
  });
  it('renders a ratings input', () => {
    expect(shallow(<App />).find('#ratings').length).toEqual(1);
  });
  it('renders a reviewList input', () => {
    expect(shallow(<App />).find('#reviewList').length).toEqual(1);
  });
  it('starts with allReviewData being an empty array', () => {
    const wrapper = shallow(<App />);
    const AppState = wrapper.state().allReviewData;
    expect(AppState.length).toEqual(0);
  });
});
