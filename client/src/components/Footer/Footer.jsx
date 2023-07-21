import React from "react";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footer_icon}>
        <i className={styles.icon} class="fa-brands fa-github"></i>
        <i className={styles.icon} class="fa-brands fa-linkedin"></i>
      </div>
    </div>
  );
};

export default Footer;
