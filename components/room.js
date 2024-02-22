import React from "react";
import styles from "@/styles/room.module.css";
import Image from "next/image";
import { FaLock } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaCrown } from "react-icons/fa6";

export default function Room() {
  return (
    <>
      <div className={styles["room"]}>
        <div className={styles["isLocked"]}>
          <FaLock size={20} />
        </div>
        <Image
          src="/image/cat.jpg"
          width={100}
          height={100}
          alt="聊天室圖片"
          className={styles["room-img"]}
        />
        <div className={styles["room-name"]}>貓咪的聊天室</div>
        <div className={styles["room-info"]}>
          <div className={styles["room-master"]}>
            <FaCrown size={20} color="#FFC700" />
            貓咪達人123
          </div>
          <div className={styles["people"]}>
            <FaUser size={20} />
            12
          </div>
        </div>
      </div>
    </>
  );
}
