import React from "react";
import styles from "@/styles/room.module.css";
import Image from "next/image";
import Link from "next/link";
import { FaLock } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaCrown } from "react-icons/fa6";

export default function Room() {
  return (
    <>
      <Link className={styles["room"]} href="/12">
        <div className={styles["isLocked"]}>
          <FaLock size={20} />
        </div>
        <div className={styles["room-img"]}>
          <Image
            src="/image/travel.png"
            width={70}
            height={70}
            alt="聊天室圖片"
          />
        </div>

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
      </Link>
    </>
  );
}
