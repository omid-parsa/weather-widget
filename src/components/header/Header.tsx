import React from 'react';
import Search from 'components/search/Search';
import Logo from 'assets/logo.jpg';
import './header.scss';

export default function Header() {
  return (
    <div className="header">
      <img className="header--logo" src={Logo} alt="src" />
      <Search />
    </div>
  );
};