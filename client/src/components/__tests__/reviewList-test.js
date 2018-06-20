import React from 'react';
import { shallow } from 'enzyme';
import ReviewList from '../reviewList';
import Review from '../review';

describe('ReviewList Component', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<ReviewList />).find('#reviewList').exists()).toBe(true);
  });
  it('should render a Review Component for each index of reviews', () => {
    const props = [1, 2, 3];
    const wrapper = shallow(<ReviewList reviews={props} />);
    const reviews = wrapper.find(Review);
    expect(reviews.length).toEqual(props.length);
  });
});
