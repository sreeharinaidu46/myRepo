import React from "react";
import "./Leftnavbar.css";

const Leftnavbar = () => {
  return (
    <nav>
      <div className="leftNavbar">
        <div style={{ marginRight: "auto" }}>jansi</div>
        <div>Total amount:</div>
        <div>Amount spent:</div>
        <div>Remaining amount:</div>
        <div style={{ paddingRight: "10px" }}>
          <button className="logout-navbar-styles">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Leftnavbar;
