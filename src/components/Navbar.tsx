import React from "react";
import { Link } from "react-router-dom";
import homeSvg from "../assets/Battle_icon-icons.com_67586.svg";
const Navbar = () => {
  return (
    <div className="navbar bg-white">
      <div className="navbar-center" style={{ margin: "0 auto" }}>
        <Link to="/">
          <img src={homeSvg} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
