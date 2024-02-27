import styles from "@/styles/room.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaLock } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaCrown } from "react-icons/fa6";
import { useState } from "react";
import EnterPasswordModal from "@/components/modal/enter-password-modal";

export default function Room({ roomData }) {
  const router = useRouter();
  const [openPasswordModal, setOpenPasswordModal] = useState({
    id: "",
    isOpened: false,
  });

  const handleRoomClick = (roomId) => {
    if (roomData.room_password) {
      setOpenPasswordModal({
        id: roomId,
        isOpened: true,
      });
    } else {
      router.push(`/${roomId}`);
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
          />
        )}
    </>
  );
}
