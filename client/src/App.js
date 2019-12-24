import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { MdDashboard, MdSettings } from 'react-icons/md';
import LoginPage from './LoginPage';
import RailNavigation from './md/RailNavigation';
import { withoutTitle as Logo } from './core/Logo';
import './App.css';

const items = {
  overview: {
    id: 'overview',
    label: 'Overview',
    icon: MdDashboard,
    route: '/overview',
    render: () => <h1>Dashboard</h1>,
  },
  settings: {
    id: 'settings',
    label: 'Settings',
    icon: MdSettings,
    route: '/settings',
    render: () => <h1>Settings</h1>,
  },
};

const defaultItem = items.overview;

export default () => {
  const hasSession = false;
  const [selectedItem] = Object.values(items)
    .map(item => [item, useRouteMatch(item.route)])
    .find(([, match]) => match) || [defaultItem, null];

  const itemsCopy = {
    ...items,
    [selectedItem.id]: { ...selectedItem, selected: true },
  };

  return hasSession ? (
    <div className="App">
      <div className="rail">
        <Logo className="App-logo" />
        <RailNavigation className="App-nav" items={Object.values(itemsCopy)} />
      </div>
      {selectedItem.render()}
    </div>
  ) : (
    <LoginPage />
  );
};
