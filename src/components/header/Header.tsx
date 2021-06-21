import React from 'react';
import Logo from 'assets/logo_transparent.png';
import './header.scss';

export default function Header() {
  return (
    <div className="header">
      <img className="header--logo" src={Logo} alt="src" />
    </div>
  );
};