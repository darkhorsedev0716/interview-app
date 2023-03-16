import React from "react";

const Header = ({ toggleDrawer, open }) => {
  return (
    <div className="app__header">
      <svg
        onClick={toggleDrawer}
        xmlns="http://www.w3.org/2000/svg"
        className={`menu-icon ${open && 'show'}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </div>
  );
};

export default Header;
