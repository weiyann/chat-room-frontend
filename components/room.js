import React from "react";
import styles from "@/styles/room.module.css";
import Image from "next/image";
import Link from "next/link";
import { FaLock } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaCrown } from "react-icons/fa6";

export default function Room({ roomData }) {
  return (
    <>
      <Link className={styles["room"]} href={`${roomData.room_id}`}>
        <div className={styles["isLocked"]}>
          {roomData.room_password ? (
            <FaLock size={20} />
          ) : (
            <FaUnlock size={20} />
          )}
        </div>
        <div className={styles["room-img"]}>
          <Image src={roomData.image} width={70} height={70} alt="聊天室圖片" />
        </div>

        <div className={styles["room-name"]}>{roomData.room_name}</div>
        <div
          className={styles["room-cate"]}
        >{`#${roomData.category_name}`}</div>

        <div className={styles["room-info"]}>
          <div className={styles["room-admin"]}>
            <FaCrown size={20} color="#FFC700" />
            {roomData.user_name}
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
