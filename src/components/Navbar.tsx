import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <Link to="/">
          <a className="btn btn-ghost normal-case text-xl">PokeApi</a>
        </Link>
      </div>
      <div className="navbar-center"></div>
      <div className="navbar-end">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
    </div>
  );
};

export default Navbar;
