import React from 'react';
import ReactDOM from 'react-dom';
import { MdMenu } from 'react-icons/md';
import Toolbar from './Toolbar';

describe('Toolbar', () => {
  let div;

  beforeEach(() => {
    div = document.createElement('div');
    ReactDOM.render(<Toolbar />, div);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(div);
  });

  describe('Burn', () => {
    it('renders', () => {});
  });
});
