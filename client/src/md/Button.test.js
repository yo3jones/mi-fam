import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

describe('Button', () => {
  let button;

  describe('render', () => {
    beforeEach(() => {
      button = shallow(<Button label="foo" />);
    });

    it('renders the button label', () => {
      expect(button.find('.Button-label').text()).toEqual('foo');
    });
  });
});
