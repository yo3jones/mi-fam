import React from 'react';
import { MdMenu, MdDashboard } from 'react-icons/md';
import Button from './core/Button';
import './Toolbar.css';

export default () => {
  return (
    <div className="Toolbar">
      <Button>
        <MdDashboard className="MdMenu" />
      </Button>
    </div>
  );
};
