import React from "react";
import { Link } from "react-router-dom";
import pokeball from "../assets/Pokeball_icon-icons.com_67533.svg";

const Footer = () => {
  return (
    <footer
      className="footer items-center p-4 bg-white text-neutral-content"
      style={{ paddingTop: "1rem" }}
    >
      <div className="items-center grid-flow-col" style={{ margin: "0 auto" }}>
        <Link to="/pokeball">
          <img src={pokeball} />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
