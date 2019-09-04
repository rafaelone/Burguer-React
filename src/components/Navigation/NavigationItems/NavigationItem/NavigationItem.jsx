import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationItem.css';

const navigationItem = ({ link, children }) => (
  <li className="navigationItem">
    <NavLink
      to={link}
      exact
    >
      {children}
    </NavLink>
  </li>
);

export default navigationItem;
