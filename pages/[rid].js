import Header from "@/components/layout/header";
import styles from "@/styles/chat-room.module.css";
import RoomMembers from "@/components/room-members";
import MessageContent from "@/components/message-content";
import { TiArrowBack } from "react-icons/ti";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import AuthContext from "@/context/authContext";
import { CHATROOM, LEAVE_ROOM } from "@/configs";
import useSocket from "@/hooks/useSocket";

export default function ChatRoom() {
  const { auth } = useContext(AuthContext);
  const { imageChosen } = useContext(AuthContext);
  const router = useRouter();
  const rid = router.query.rid;
  const userId = auth.user_id;
  // console.log(uid);
  const userName = auth.user_name;
  const userImage = imageChosen.src;
  const socket = useSocket(rid, userName, userImage, userId);

  const [chatRoomData, setChatRoomData] = useState([]);
  const [users, setUsers] = useState([]);
  // console.log(users);
  const getChatRoomData = async () => {
    try {
      const res = await fetch(CHATROOM + `/${rid}`);
      const data = await res.json();
      setChatRoomData(data);
    } catch (ex) {
      console.log(ex);
    }
  };

  // 刪除房間用戶資料
  const deleteMemberData = async (userId) => {
    try {
      const res = await fetch(LEAVE_ROOM + `?uid=${userId}`, {
        method: "DELETE",
      });
      const data = res.json();
      console.log(data);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    getChatRoomData();
  }, [rid, users]);

  useEffect(() => {
    if (!socket) return;
    socket.on("user_members", (userData) => {
      setUsers((prevUsers) => [...prevUsers, userData]);
    });

    //  監聽斷連事件
    socket.on("user_disconnected", (userId) => {
      console.log(userId);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.userId !== userId)
      );
      deleteMemberData(userId);
    });
  }, [socket]);

  // useEffect(() => {
  //   deleteMemberData();
  // }, [users]);

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
            <RoomMembers users={users} chatRoomData={chatRoomData} />
            <MessageContent socket={socket} auth={auth} />
          </div>
        </main>
      </div>
    </>
  );
}
