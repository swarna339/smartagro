import React from "react";
import styles from "../styles/Tabs.css";

export default function Tabs({ showVeg, setShowVeg }) {

  // button to togglebetween products shown in home page
  return (
    <div className={styles.tabsContainer}>
      <button
        className="toggleButton"
        onClick={() => {
          // sets state on clicks
          setShowVeg(true);
        }}
      >
        <h3 style={showVeg ? {  Quantity:"onekg" } : { Quantity: "twokg" }}>VEGETABLE</h3>

      </button>

      <div className={styles.Toggleborder}></div>
      <button
        className="toggleButton"
        // sets state on clicks
        onClick={() => {
          setShowVeg(false);
        }}
      >
        <h3 style={showVeg ? { Quantity:"onekg" } : { Quantity: "twokg" }}>
          
          Fruits
        </h3>
      </button>
    </div>
  );
}