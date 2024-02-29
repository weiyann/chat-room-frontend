import styles from "@/styles/room.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaLock } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaCrown } from "react-icons/fa6";
import { useState, useContext } from "react";
import EnterPasswordModal from "@/components/modal/enter-password-modal";
import { ENTER_ROOM } from "@/configs";
import AuthContext from "@/context/authContext";

export default function Room({ roomData }) {
  const { auth } = useContext(AuthContext);
  const router = useRouter();
  const [openPasswordModal, setOpenPasswordModal] = useState({
    id: "",
    isOpened: false,
  });

  const enterRoom = async () => {
    try {
      const res = await fetch(ENTER_ROOM, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          room_id: roomData.room_id,
          user_id: auth.user_id,
        }),
      });
      const data = await res.json(0);
      if (data.success) {
        router.push(`/${roomData.room_id}`);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleRoomClick = (roomId) => {
    if (roomData.room_password) {
      setOpenPasswordModal({
        id: roomId,
        isOpened: true,
      });
    } else {
      enterRoom();
    }
  };

  return (
    <>
      <div
        className={styles["room"]}
        onClick={() => {
          handleRoomClick(roomData.room_id);
        }}
      >
        <div className={styles["isLocked"]}>
          {roomData.room_password ? (
            <FaLock size={20} />
          ) : (
            <FaUnlock size={20} />
          )}
        </div>
        <div className={styles["room-img"]}>
          <Image src={roomData.image} width={70} height={70} alt="聊天室圖片" />
        </div>

        <div className={styles["room-name"]}>{roomData.room_name}</div>
        <div
          className={styles["room-cate"]}
        >{`#${roomData.category_name}`}</div>

        <div className={styles["room-info"]}>
          <div className={styles["room-admin"]}>
            <FaCrown size={20} color="#FFC700" />
            {roomData.user_name}
          </div>
          <div className={styles["people"]}>
            <FaUser size={20} />
            {roomData.member_count}
          </div>
        </div>
      </div>
      {openPasswordModal.id === roomData.room_id &&
        openPasswordModal.isOpened && (
          <EnterPasswordModal
            setOpenPasswordModal={setOpenPasswordModal}
            roomData={roomData}
            auth={auth}
          />
        )}
    </>
  );
}
