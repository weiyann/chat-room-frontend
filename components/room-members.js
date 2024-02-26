import React from "react";
import styles from "@/styles/chat-room.module.css";
import MemberCard from "./card/member-card";

export default function RoomMembers({ chatRoomData }) {
  return (
    <>
      <div className={styles["member-box"]}>
        {chatRoomData.map((v, i) => (
          <MemberCard memberData={v} key={i} />
        ))}
      </div>
    </>
  );
}
