import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { API_SERVER } from "@/configs";

const useSocket = (room_id, userName, userImage, userId) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(API_SERVER);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      newSocket.emit("join_room", room_id, userName, userImage, userId);
    });

    return () => {
      if (newSocket) {
        // console.log(123);
        newSocket.emit("leave_room", room_id, userName, userId);
        newSocket.disconnect();
      }
    };
  }, [room_id, userName]);

  return socket;
};

export default useSocket;
