import { useState, useEffect, useContext } from "react";
import styles from "@/styles/chat-room.module.css";
import Image from "next/image";
import { io } from "socket.io-client";
import { API_SERVER } from "@/configs";
import { useRouter } from "next/router";
import AuthContext from "@/context/authContext";

export default function MessageContent({ chatRoomData }) {
  const { auth } = useContext(AuthContext);
  const [socket, setSocket] = useState(null); // 儲存 Socket.io 連接的狀態
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const room_id = router.query.rid;
  const userName = auth.user_name;

  useEffect(() => {
    const newSocket = io(API_SERVER);
    setSocket(newSocket); // 設定 Socket.io 連接狀態

    newSocket.on("connect", () => {
      newSocket.emit("join_room", room_id, userName);
    });

    newSocket.on("chat_message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    newSocket.on("user_joined", (userName) => {
      // 加入聊天室
      setMessages((prevMessages) => [
        ...prevMessages,
        `${userName} 加入了聊天室`,
      ]);
    });

    newSocket.on("user_left", (userName) => {
      // 離開聊天室
      setMessages((prevMessages) => [
        ...prevMessages,
        `${userName} 離開了聊天室`,
      ]);
    });

    // 在組件卸載時關閉 Socket.io 連接
    return () => {
      if (socket) {
        console.log("123");
        socket.emit("leave_room", room_id, userName);
      }
      newSocket.disconnect();
    };
  }, [room_id]);

  const sendMessage = () => {
    if (socket && auth.token && auth.user_name && auth.imageChosen.src) {
      const senderId = auth.token;
      const userName = auth.user_name;
      const userImage = auth.imageChosen.src;
      socket.emit("chat_message", {
        room_id,
        message: messageInput,
        senderId,
        userName,
        userImage,
      });
      setMessageInput("");
    }
  };

  return (
    <>
      <div className={styles["message-content"]}>
        <div className={styles["message-box"]}>
          {messages &&
            messages.map((v, i) => (
              <div key={i} className={styles["message"]}>
                {typeof v === "string" ? (
                  <p>{v}</p>
                ) : v.senderId !== auth.token ? (
                  <div className={styles["other-message"]}>
                    <Image
                      src={v.userImage}
                      alt="user-img"
                      width={40}
                      height={40}
                    />
                    <div className={styles["name-and-message"]}>
                      <div className={styles["chat-member"]}>{v.userName}</div>
                      <p>{v.message}</p>
                    </div>
                  </div>
                ) : (
                  <div className={styles["my-message"]}>
                    <p>{v.message}</p>
                  </div>
                )}
              </div>
            ))}
        </div>
        <div className={styles["input-box"]}>
          <input
            type="text"
            className={styles["input-enter"]}
            placeholder="在這裡輸入聊天訊息"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />

          <form action="">
            <button
              type="button"
              className={styles["btn-enter"]}
              onClick={sendMessage}
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
