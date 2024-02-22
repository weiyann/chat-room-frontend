import React from "react";
import styles from "@/styles/regist-form.module.css";
import Header from "@/components/layout/header";

export default function Regist() {
  return (
    <>
      <Header />
      <div className="container">
        <div className={styles["main"]}>
          <h3 className={styles["title"]}>註冊</h3>
          <form action="">
            <div className={styles["input"]}>
              <label htmlFor="name">
                請輸入暱稱：
                <input type="text" className={styles["input-style"]} />
              </label>
            </div>
            <div className={styles["input"]}>
              <label htmlFor="name">
                請輸入帳號：
                <input type="text" className={styles["input-style"]} />
              </label>
            </div>
            <div className={styles["input"]}>
              <label htmlFor="name">
                請輸入密碼：
                <input type="text" className={styles["input-style"]} />
              </label>
            </div>
            <div className={styles["input"]}>
              <label htmlFor="name">
                確認密碼：
                <input type="text" className={styles["input-style"]} />
              </label>
            </div>
            <div className={styles["submit"]}>
              <button type="button" className={styles["btn-submit"]}>
                送出
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
