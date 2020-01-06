import React from 'react';
import { shallow, mount } from 'enzyme';
import TextField from './TextField';

describe('TextField', () => {
  let textField;

  describe('render', () => {
    beforeEach(() => {
      textField = mount(
        <TextField label="foo" helpText="bar">
          <input type="text" value="bang" onChange={() => {}} />
        </TextField>
      );
    });

    it('renders the label', () => {
      expect(textField.find('.TextField-label').text()).toBe('foo');
    });

    it('renders the  helpText', () => {
      expect(textField.find('.TextField-helper-text').text()).toBe('bar');
    });

    it('renders the label condensed', () => {
      expect(textField.find('.TextField-label').hasClass('condensed')).toBe(
        true
      );
    });
  });

  describe('No Value', () => {
    beforeEach(() => {
      textField = shallow(
        <TextField label="foo">
          <input type="text" />
        </TextField>
      );
    });

    it('renders the label prominently', () => {
      expect(textField.find('.TextField-label').hasClass('prominent')).toBe(
        true
      );
    });
  });

  describe('focused', () => {
    beforeEach(() => {
      textField = mount(
        <TextField label="foo">
          <input type="text" />
        </TextField>
      );
      textField.find('.TextField input').simulate('focus');
    });

    it('renders the label condensed', () => {
      expect(textField.find('.TextField-label').hasClass('condensed')).toBe(
        true
      );
    });
  });

  describe('blur', () => {
    beforeEach(() => {
      textField = mount(
        <TextField label="foo">
          <input type="text" />
        </TextField>
      );
      textField.find('.TextField input').simulate('focus');
      textField.find('.TextField input').simulate('blur');
    });

    it('renders the label prominently', () => {
      expect(textField.find('.TextField-label').hasClass('prominent')).toBe(
        true
      );
    });
  });
});
