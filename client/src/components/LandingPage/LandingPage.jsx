import React from "react";
import { Link } from "react-router-dom";
import styles from "./landingpage.module.css";

function Landing() {
  return (
    <div className={styles.landing}>
      <h1 className={styles.landing_title}>Bienvenidos!</h1>
      <Link to="/home">
      <button className={styles.landingbtn}>INGRESAR</button>
      </Link>
    </div>
  );
}

export default Landing;
