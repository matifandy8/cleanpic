"use client";

import Link from "next/link";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.navtitle}>CleanPic</div>
      <input type="checkbox" id="nav-check" className={styles.navcheck} />
      <div className={styles.navheader}></div>
      <div className={styles.navbtn}>
        <label htmlFor="nav-check" className={styles.navtoggle}>
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>

      <div className={styles.navlinks}>
        <Link href="/" className={styles.navlink}>
          Home
        </Link>
        <Link href="/about" className={styles.navlink}>
          About
        </Link>
        <Link href="/contact" className={styles.navlink}>
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
