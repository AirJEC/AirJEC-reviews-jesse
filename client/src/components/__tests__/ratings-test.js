import React from 'react';
import { shallow } from 'enzyme';
import Ratings from '../ratings';

describe('Ratings Component', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<Ratings />).find('#ratings').exists()).toBe(true);
  });
});
