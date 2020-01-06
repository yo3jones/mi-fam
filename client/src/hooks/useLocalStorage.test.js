import React from 'react';
import { mount } from 'enzyme';
import useLocalStorage from './useLocalStorage';

const XCustom = () => {
  const [value, setValue, remove] = useLocalStorage('foo', { foo: 'bar' });

  return (
    <div>
      <button id="set" type="button" onClick={() => setValue({ bar: 'foo' })}>
        {JSON.stringify(value)}
      </button>
      <button type="button" id="remove" onClick={() => remove()}>
        remove
      </button>
    </div>
  );
};

describe('useLocalStorage', () => {
  let wrapper;

  describe('initial value', () => {
    beforeEach(() => {
      window.localStorage.removeItem('foo');

      wrapper = mount(<XCustom />);
    });

    it('renders the initial value', () => {
      expect(wrapper.find('#set').text()).toEqual(
        JSON.stringify({ foo: 'bar' })
      );
    });
  });

  describe('existing vallue', () => {
    beforeEach(() => {
      window.localStorage.setItem('foo', JSON.stringify({ baz: 'boo' }));

      wrapper = mount(<XCustom />);
    });

    it('renders the set value', () => {
      expect(wrapper.find('#set').text()).toEqual(
        JSON.stringify({ baz: 'boo' })
      );
    });
  });

  describe('setValue', () => {
    beforeEach(() => {
      window.localStorage.removeItem('foo');

      wrapper = mount(<XCustom />);

      wrapper.find('#set').simulate('click');
    });

    it('sets local storage', () => {
      expect(window.localStorage.getItem('foo')).toEqual(
        JSON.stringify({ bar: 'foo' })
      );
    });

    it('renders the new value', () => {
      expect(wrapper.find('#set').text()).toEqual(
        JSON.stringify({ bar: 'foo' })
      );
    });
  });

  describe('remove', () => {
    beforeEach(() => {
      window.localStorage.setItem('foo', JSON.stringify({ baz: 'boo' }));

      wrapper.mount();

      wrapper.find('#remove').simulate('click');
    });

    it('removes the localStorage', () => {
      expect(window.localStorage.getItem('foo')).toBeFalsy();
    });
  });
});
