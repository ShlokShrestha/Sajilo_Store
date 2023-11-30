import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light text-center p-3  ">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Your Company Name</p>
      </div>
    </footer>
  );
};

export default Footer;
