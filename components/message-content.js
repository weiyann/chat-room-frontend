import { useEffect, useState } from "react";
import styles from "@/styles/chat-room.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

export default function MessageContent({ socket, auth }) {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const room_id = router.query.rid;

  useEffect(() => {
    if (!socket) return;

    socket.on("chat_message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    socket.on("user_joined", (userName) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        `${userName} 加入了聊天室`,
      ]);
    });

    socket.on("user_left", (userName) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        `${userName} 離開了聊天室`,
      ]);
    });

    return () => {
      socket.off("chat_message");
      socket.off("user_joined");
      socket.off("user_left");
    };
  }, [socket]);

  const sendMessage = () => {
    if (!socket || !auth.token || !auth.user_name || !auth.imageChosen.src)
      return;

    const userName = auth.user_name;
    const senderId = auth.token;
    const userImage = auth.imageChosen.src;
    socket.emit("chat_message", {
      room_id,
      message: messageInput,
      senderId,
      userName,
      userImage,
    });
    setMessageInput("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
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
            onKeyUp={handleKeyDown}
          />

          <form>
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
