import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <>
    <nav>
  <ul className="flex bg-racing-green text-tan h-10 justify-between items-center p-6 text-lg">
    <li>
      <Link to="/">The Car Auction House </Link>
    </li>
    <div className="flex space-x-10">
      <li>
        <Link to="/buyingPage">Buy </Link>
      </li>
      <li>
        <Link to="/sellingPage">Sell </Link>
      </li>
      <li>
        <Link to="/favouritesPage">Favourites </Link>
      </li>
      <li>
        <Link to="/adminPage">Admin </Link>
      </li>
      <li>
        <Link to="/loginPage">Login </Link>
      </li>
    </div>
  </ul>
</nav>
    <Outlet />
    </>
  );
};

export default NavBar;