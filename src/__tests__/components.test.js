import React from 'react';
import renderer from 'react-test-renderer';
import { fromJS } from 'immutable';
import { App } from '../App';

// to handle react-dom and react-test-renderer conflict
// https://blog.lab.coop/first-impressions-using-jest-and-snapshot-testing-with-react-ce7aee925f36#.ez6ng8l9a
jest.mock('react-dom');
describe('components', function() {
  describe('<App />', function() {
    it('renders correctly', function() {
      var tree = renderer.create(<App redux={fromJS({})} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
