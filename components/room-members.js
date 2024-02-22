import React from "react";
import styles from "@/styles/chat-room.module.css";
import MemberCard from "./card/member-card";

export default function RoomMembers() {
  return (
    <>
      <div className={styles["member-box"]}>
        <MemberCard />
        <MemberCard />
        <MemberCard />
      </div>
    </>
  );
}
