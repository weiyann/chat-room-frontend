import Image from "next/image";
import styles from "@/styles/main.module.css";
import ChatAnimation from "../lottie/chat-animation";
import Link from "next/link";
import { MdChangeCircle } from "react-icons/md";
import { useState, useContext } from "react";
import CharacterModal from "../modal/character-modal";
import { LOGIN } from "@/configs";
import AuthContext from "@/context/authContext";
import { FaArrowRightToBracket } from "react-icons/fa6";

export default function Main() {
  const { auth, setAuth, imageChosen, setImageChosen } =
    useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [loginData, setLoginData] = useState({
    account: "",
    password: "",
  });
  // const [imageChosen, setImageChosen] = useState({});
  const handleLogin = async () => {
    //TODO:表單的驗證

    try {
      const res = await fetch(LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        // 如果登入成功設定到localStorage
        const { token, user_name } = data;
        localStorage.setItem(
          "auth",
          JSON.stringify({ token, user_name, imageChosen })
        );
        setAuth({
          ...auth,
          token: token,
          user_name: user_name,
        });
      } else {
        alert("帳號或密碼錯誤");
      }
    } catch (ex) {
      console.log(ex);
    }
  };
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
            priority={true}
          />
          <div className={styles["login-content"]}>
            <div className={styles["left-content"]}>
              <div className={styles["image-box"]}>
                <Image
                  src={imageChosen ? imageChosen.src : "/image/user-01.png"}
                  alt="user-image"
                  width={200}
                  height={200}
                  className={styles["user-image"]}
                ></Image>
                <MdChangeCircle
                  className={styles["image-change"]}
                  onClick={() => {
                    setOpenModal(true);
                  }}
                />
                {openModal && (
                  <CharacterModal
                    setOpenModal={setOpenModal}
                    openModal={openModal}
                    isChosen={imageChosen}
                    setIsChosen={setImageChosen}
                  />
                )}
              </div>
              {/* <div id="form"></div> */}
              {!auth.token ? (
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
                        value={loginData.account}
                        onChange={(e) => {
                          setLoginData({
                            ...loginData,
                            [e.target.name]: e.target.value,
                          });
                        }}
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
                        value={loginData.password}
                        onChange={(e) => {
                          setLoginData({
                            ...loginData,
                            [e.target.name]: e.target.value,
                          });
                        }}
                      />
                    </label>
                  </div>
                  <div className={styles["login-and-regist"]}>
                    <button
                      type="button"
                      className={styles["btn-login"]}
                      onClick={() => {
                        handleLogin();
                      }}
                    >
                      登入
                    </button>
                    <Link href="/regist" className={styles["btn-regist"]}>
                      註冊
                    </Link>
                  </div>
                </form>
              ) : (
                <>
                  <div className={styles["welcome"]}>
                    歡迎！ {auth.user_name}
                  </div>
                  <Link href="/lobby" className={styles["to-lobby"]}>
                    前往大廳 <FaArrowRightToBracket size={24} />
                  </Link>
                </>
              )}
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
