import Header from "@/components/layout/header";
import styles from "@/styles/chat-room.module.css";
import RoomMembers from "@/components/room-members";
import MessageContent from "@/components/message-content";
import { TiArrowBack } from "react-icons/ti";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CHATROOM } from "@/configs";

export default function ChatRoom() {
  const router = useRouter();
  // console.log(router.query.rid);
  const rid = router.query.rid;
  const [chatRoomData, setChatRoomData] = useState([]);

  const getChatRoomData = async () => {
    try {
      const res = await fetch(CHATROOM + `/${rid}`);
      const data = await res.json();
      setChatRoomData(data);
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(() => {
    getChatRoomData();
  }, [rid]);

  return (
    <>
      <Header />
      <div className="container">
        <main className={styles["main"]}>
          <div className={styles["title"]}>
            <Link href="/lobby" className={styles["page-back"]}>
              <TiArrowBack size={40} />
              回上頁
            </Link>
            <div className={styles["room_name"]}>
              房間名稱：{chatRoomData[0] && chatRoomData[0].room_name}
            </div>
            <div className={styles["category_name"]}>
              分類：{chatRoomData[0] && chatRoomData[0].category_name}
            </div>
          </div>
          <div className={styles["content"]}>
            <RoomMembers chatRoomData={chatRoomData} />
            <MessageContent chatRoomData={chatRoomData} />
          </div>
        </main>
      </div>
    </>
  );
}
