import React from "react";
import Header from "@/components/layout/header";
import styles from "@/styles/chat-room.module.css";
import RoomMembers from "@/components/room-members";
import MessageContent from "@/components/message-content";

export default function ChatRoom() {
  return (
    <>
      <Header />
      <div className="container">
        <main className={styles["main"]}>
          <RoomMembers />
          <MessageContent />
        </main>
      </div>
    </>
  );
}
