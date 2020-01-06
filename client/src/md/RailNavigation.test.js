import React from 'react';
import { Router, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { mount } from 'enzyme';
import RailNavigation, { Item } from './RailNavigation';

const Icon = () => <h1>icon</h1>;

describe('RailNavigation', () => {
  let navigation;
  let items;

  beforeEach(() => {
    items = [
      {
        id: 'foo',
        label: 'bar',
        route: '/foo',
        icon: Icon,
        selected: true,
      },
      {
        id: 'bam',
        label: 'boom',
        route: '/bam',
        icon: Icon,
        selected: false,
      },
    ];

    navigation = mount(<RailNavigation items={items} />, {
      wrappingComponent: Router,
      wrappingComponentProps: { history: createBrowserHistory() },
    });
  });

  it('renders 2 list items', () => {
    expect(navigation.find(Item).length).toEqual(2);
  });

  describe('animation', () => {
    let item;

    beforeEach(() => {
      item = navigation.find(Item).first();

      item.find(Link).simulate('click');
    });

    it('does not break', () => {});
  });
});
