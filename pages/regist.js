import { useState, useContext } from "react";
import styles from "@/styles/regist-form.module.css";
import Header from "@/components/layout/header";
import { REGIST } from "@/configs";
import { useRouter } from "next/router";
import AuthContext from "@/context/authContext";

export default function Regist() {
  const router = useRouter();
  const { imageChosen } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    user_name: "",
    account: "",
    password: "",
    password_confirmed: "",
    user_img: imageChosen.src,
  });
  const [isSubmmited, setIsSubmitted] = useState(false);
  const sendData = async () => {
    //TODO:欄位驗證
    // 必填欄位
    if (
      !formData.user_name ||
      !formData.account ||
      !formData.password ||
      !formData.password_confirmed
    ) {
      return;
    }
    // 密碼等於確認密碼驗證
    if (formData.password !== formData.password_confirmed) {
      return;
    }
    try {
      const res = await fetch(REGIST, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData,
        }),
      });
      const data = await res.json();
      if (data.success) {
        confirm("註冊成功");
        router.push("/");
      } else {
        alert("註冊失敗");
      }
    } catch (ex) {}
  };
  return (
    <>
      <Header />
      <div className="container">
        <main className={styles["main"]}>
          <h3 className={styles["title"]}>註冊</h3>
          <form action="">
            <div className={styles["input"]}>
              <label htmlFor="name">
                請輸入暱稱：
                <input
                  type="text"
                  className={styles["input-style"]}
                  name="user_name"
                  value={formData.user_name}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </label>

              <div className={styles["error"]}>
                {!formData.user_name && isSubmmited ? "*暱稱為必填" : ""}
              </div>
            </div>

            <div className={styles["input"]}>
              <label htmlFor="name">
                請輸入帳號：
                <input
                  type="text"
                  className={styles["input-style"]}
                  name="account"
                  value={formData.account}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </label>
              <div className={styles["error"]}>
                {!formData.account && isSubmmited ? "*帳號為必填" : ""}
              </div>
            </div>
            <div className={styles["input"]}>
              <label htmlFor="name">
                請輸入密碼：
                <input
                  type="password"
                  className={styles["input-style"]}
                  name="password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </label>
              <div className={styles["error"]}>
                {!formData.password && isSubmmited ? "*密碼為必填" : ""}
              </div>
            </div>
            <div className={styles["input"]}>
              <label htmlFor="name">
                確認密碼：
                <input
                  type="password"
                  className={styles["input-style"]}
                  name="password_confirmed"
                  value={formData.password_confirmed}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </label>
              <div className={styles["error"]}>
                {(isSubmmited && !formData.password_confirmed) ||
                (isSubmmited &&
                  formData.password !== formData.password_confirmed)
                  ? "*密碼不一致"
                  : ""}
              </div>
            </div>
            <div className={styles["submit"]}>
              <button
                type="button"
                className={styles["btn-submit"]}
                onClick={() => {
                  sendData();
                  setIsSubmitted(true);
                }}
              >
                送出
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}
