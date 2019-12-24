import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './RailNavigation.css';

const forceStyleRecalc = el => el.offsetHeight;

const Item = ({ item }) => {
  const { id, label, icon: Icon, route, selected } = item;

  const listItemRef = useRef(null);
  const [animating, setAnimating] = useState(false);

  const handleClick = () => setAnimating(true);

  useEffect(() => {
    const { current: listItem } = listItemRef;

    // const _ok = 'something';
    //
    // console.log(_ok);

    forceStyleRecalc(listItem);

    if (animating) listItem.classList.add('animate');

    setAnimating(false);
  });

  return (
    <Link
      to={route}
      key={id}
      className="RailNavigation-item-nav"
      onClick={handleClick}
    >
      <li
        className={`RailNavigation-item ${
          selected ? 'RailNavigation-item-selected' : ''
        }`}
        ref={listItemRef}
      >
        <Icon className="RailNavigation-item-icon" />
        <span className="RailNavigation-item-label">{label}</span>
      </li>
    </Link>
  );
};

export default ({ className = '', items = [] }) => {
  return (
    <ul className={`${className} RailNavigation`}>
      {items.map(item => (
        <Item key={item.id} item={item} />
      ))}
    </ul>
  );
};
