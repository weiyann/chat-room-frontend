import React from "react";
import styles from "@/styles/chat-room.module.css";
import Image from "next/image";

export default function MessageContent() {
  return (
    <>
      <div className={styles["message-content"]}>
        <div className={styles["message-box"]}>
          <div className={styles["other-message"]}>
            <Image
              src="/image/user-05.png"
              alt="user-img"
              width={40}
              height={40}
            />
            <div className={styles["name-and-message"]}>
              <div className={styles["chat-member"]}>YannWei</div>
              <p>
                123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123
              </p>
            </div>
          </div>
          <div className={styles["other-message"]}>
            <Image
              src="/image/user-05.png"
              alt="user-img"
              width={40}
              height={40}
            />
            <div className={styles["name-and-message"]}>
              <div className={styles["chat-member"]}>YannWei</div>
              <p>12312312312312</p>
            </div>
          </div>

          <div className={styles["my-message"]}>
            <p>
              fwerfawergfergrlargaergaergreagvaergraegaegaergafwerfawergfergrlargaergaergreagvaergraegaegaergafwerfawergfergrlargaergaergreagvaergraegaegaergafwerfawergfergrlargaergaergreagvaergraegaegaergafwerfawergfergrlargaergaergreagvaergraegaegaerga
            </p>
          </div>
        </div>
        <div className={styles["input-box"]}>
          <input
            type="text"
            className={styles["input-enter"]}
            placeholder="在這裡輸入聊天訊息"
          />

          <form action="">
            <button type="button" className={styles["btn-enter"]}>
              Enter
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
