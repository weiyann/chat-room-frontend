import { useState } from "react";
import styles from "@/styles/enter-password-modal.module.css";
import { useRouter } from "next/router";
import { ENTER_ROOM } from "@/configs";

export default function EnterPasswordModal({
  setOpenPasswordModal,
  roomData,
  auth,
}) {
  const router = useRouter();
  const [password, setPassword] = useState("");

  const submitPassword = async () => {
    if (password == roomData.room_password) {
      try {
        console.log(roomData.room_id);
        const res = await fetch(ENTER_ROOM, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            room_id: roomData.room_id,
            user_id: auth.user_id,
          }),
        });
        const data = await res.json(0);
        if (data.success) {
          router.push(`/${roomData.room_id}`);
        }
      } catch (ex) {
        console.log(ex);
      }
    } else {
      return alert("密碼錯誤");
    }
  };
  return (
    <>
      <div className={styles["modal-background"]}>
        <div className={styles["modal-container"]}>
          <div
            className={styles["modal-header"]}
          >{`房名：${roomData.room_name}`}</div>
          <div className={styles["modal-body"]}>
            <label htmlFor="password">
              輸入密碼：
              <input
                type="password"
                name="password"
                value={password}
                className={styles["password-input"]}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>
          </div>
          <div className={styles["modal-footer"]}>
            <button
              className={styles["btn-cancel"]}
              onClick={() => {
                setOpenPasswordModal(false);
              }}
            >
              取消
            </button>
            <button
              className={styles["btn-submit"]}
              onClick={() => {
                submitPassword();
              }}
            >
              送出
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
