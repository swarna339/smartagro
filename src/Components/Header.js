import React from "react";

import { Link } from "react-router-dom";

import styles from "../styles/header.css" ;

function Header() {
  return (
    <header className={styles.headerInnerContainer}>

      {/* navbar with links to pages */}
      <nav>
        <div className={styles.navWrapper}>
          <div className={styles.logoContainer}>

            <h1>
              <Link to="/" style={{textDecoration:"none" , color:"black"}}>AGROMART</Link>
            </h1>

          </div>

          <div className={styles.toolsContainer}>
            <Link to="/create" >
            <button className={styles.headerIcons}>
                <h3>
                  <i className="fa-solid fa-plus"></i>
                </h3>
              </button>
            </Link>

            <Link to="/cart">
              <button className={styles.headerIcons}>
                <h3>
                  <i className="fa-solid fa-cart-shopping"></i>
                </h3>
              </button>
            </Link>
            
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;