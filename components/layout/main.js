import Image from "next/image";
import styles from "@/styles/main.module.css";
import ChatAnimation from "../lottie/chat-animation";
import Link from "next/link";

export default function Main() {
  return (
    <>
      <div className="container">
        <main className={styles["main"]}>
          <Image
            src="/image/ribbon-01.png"
            alt="緞帶"
            width={400}
            height={120}
            className={styles["ribbon"]}
          />
          <div className={styles["login-content"]}>
            <div className={styles["left-content"]}>
              <Image
                src="/image/user-01.png"
                alt="user-image"
                width={200}
                height={200}
                className={styles["user-image"]}
              ></Image>
              <form action="">
                <div className={styles["account"]}>
                  <label htmlFor="account">
                    帳號：
                    <input
                      type="text"
                      name="account"
                      id="account"
                      className={styles["input-account"]}
                      placeholder="請輸入帳號"
                    />
                  </label>
                </div>
                <div className={styles["password"]}>
                  <label htmlFor="password">
                    密碼：
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className={styles["input-password"]}
                      placeholder="請輸入密碼"
                    />
                  </label>
                </div>
                <div className={styles["login-and-regist"]}>
                  <button type="button" className={styles["btn-login"]}>
                    登入
                  </button>
                  <button type="button" className={styles["btn-regist"]}>
                    註冊
                  </button>
                </div>
              </form>
            </div>
            <div className={styles["string"]}></div>
            <div className={styles["right-content"]}>
              <ChatAnimation />
              <div className={styles["info"]}>創建聊天室！一起聊天吧！！</div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
