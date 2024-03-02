import React from "react";
import styles from "@/styles/chat-room.module.css";
import Image from "next/image";
import { FaCrown } from "react-icons/fa6";

export default function MemberCard({ memberData }) {
  // console.log(memberData);
  return (
    <>
      <div className={styles["member-card"]}>
        <div className={styles["member-img"]}>
          {memberData.level == "admin" ? (
            <FaCrown className={styles["crown"]} size={30} />
          ) : (
            ""
          )}

          <Image
            src={memberData.user_img}
            alt="user-img"
            width={60}
            height={60}
            className={styles["member-img"]}
          />
        </div>

        <div className={styles["member-name"]}>{memberData.user_name}</div>
      </div>
    </>
  );
}
