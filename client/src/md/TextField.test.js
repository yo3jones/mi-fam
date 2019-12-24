import React from 'react';
import { shallow, mount } from 'enzyme';
import TextField from './TextField';

describe('TextField', () => {
  let textField;

  describe('render', () => {
    beforeAll(() => {
      textField = shallow(<TextField label="foo" helpText="bar" value="baz" />);
    });

    it('renders the label', () => {
      expect(textField.find('.TextField-label').text()).toBe('foo');
    });

    it('renders the  helpText', () => {
      expect(textField.find('.TextField-helper-text').text()).toBe('bar');
    });

    it('renders the vaue', () => {
      expect(
        textField
          .find('.TextField-input')
          .first()
          .prop('value')
      ).toBe('baz');
    });

    it('renders the label condensed', () => {
      expect(textField.find('.TextField-label').hasClass('condensed')).toBe(
        true
      );
    });
  });

  describe('No Value', () => {
    beforeAll(() => {
      textField = shallow(<TextField label="foo" />);
    });

    it('renders the label prominently', () => {
      expect(textField.find('.TextField-label').hasClass('prominent')).toBe(
        true
      );
    });
  });

  describe('focused', () => {
    beforeAll(() => {
      textField = shallow(<TextField label="foo" />);
      textField.find('.TextField-input').simulate('focus');
    });

    it('renders the label condensed', () => {
      expect(textField.find('.TextField-label').hasClass('condensed')).toBe(
        true
      );
    });
  });

  describe('blur', () => {
    beforeAll(() => {
      textField = shallow(<TextField label="foo" />);
      textField.find('.TextField-input').simulate('focus');
      textField.find('.TextField-input').simulate('blur');
    });

    it('renders the label prominently', () => {
      expect(textField.find('.TextField-label').hasClass('prominent')).toBe(
        true
      );
    });
  });

  describe('change value', () => {
    let spy;

    beforeAll(async () => {
      spy = jest.fn();

      textField = mount(
        <TextField label="foo" value="bar" type="password" handleChange={spy} />
      );
      await new Promise(resolve => setTimeout(resolve, 1000));
      textField.find('.TextField-input').simulate('change');
    });

    it('calls the handler with the value', () => {
      expect(spy).toBeCalledWith(expect.objectContaining({ value: 'bar' }));
    });
  });
});
