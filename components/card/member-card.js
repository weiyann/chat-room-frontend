import React from "react";
import styles from "@/styles/chat-room.module.css";
import Image from "next/image";
import { FaCrown } from "react-icons/fa6";

export default function MemberCard({ memberData }) {
  return (
    <>
      <div className={styles["member-card"]}>
        <div className={styles["member-img"]}>
          <FaCrown className={styles["crown"]} size={30} />
          <Image
            src="/image/user-04.png"
            alt="user-img"
            width={60}
            height={60}
          />
        </div>

        <div className={styles["member-name"]}>WeiYann</div>
      </div>
    </>
  );
}
