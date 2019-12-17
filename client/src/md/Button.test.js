import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Button from './Button';

describe('Button', () => {
  describe('handleClick', () => {
    let spy;

    beforeEach(() => {
      spy = sinon.spy();

      shallow(<Button handleClick={spy} />)
        .find('.Button')
        .simulate('click');
    });

    it('calls the onClick handler', () => {
      expect(spy).toHaveBeenCalledOnce();
    });
  });
});
