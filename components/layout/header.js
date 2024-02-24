import styles from "@/styles/header.module.css";
import { useContext } from "react";
import AuthContext from "@/context/authContext";

export default function Header() {
  const { logout } = useContext(AuthContext);
  return (
    <>
      <header className={styles["header"]}>
        <div className={styles["container"]}>
          <div className={styles["title"]}>CHAT CHAT</div>
          <button
            onClick={() => {
              alert("已登出");
              logout();
            }}
          >
            登出
          </button>
        </div>
      </header>
    </>
  );
}
