import React from "react";
import styles from "@/styles/header.module.css";
import Image from "next/image";

export default function Header() {
  return (
    <>
      <header className={styles["header"]}>
        <div className={styles["container"]}>
          <div className={styles["title"]}>CHAT CHAT</div>
        </div>
      </header>
    </>
  );
}
