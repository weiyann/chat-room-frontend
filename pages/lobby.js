import { useState, useEffect } from "react";
import styles from "@/styles/lobby.module.css";
import Header from "@/components/layout/header";
import Image from "next/image";
import Room from "@/components/room";
import { FaDoorOpen } from "react-icons/fa6";
import { ROOM_LIST } from "@/configs";

export default function Lobby() {
  const [roomData, setRoomData] = useState([]); // 房間資料的狀態

  // 取得資料的函式
  const getRoomList = async () => {
    try {
      const res = await fetch(ROOM_LIST);
      const data = await res.json();
      setRoomData(data.rows);
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(() => {
    getRoomList();
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <main className={styles["main"]}>
          <div className={styles["lobby-title"]}>
            <div className={styles["search-box"]}>
              <label htmlFor="search">
                搜尋：
                <input
                  type="text"
                  className={styles["search-input"]}
                  placeholder="請輸入關鍵字"
                />
              </label>
            </div>

            <Image
              src="/image/ribbon-01.png"
              alt="緞帶"
              width={400}
              height={120}
              className={styles["ribbon"]}
            />
            <div className={styles["btn-box"]}>
              <button className={styles["btn-create-room"]}>
                <FaDoorOpen size={25} />
                創建房間
              </button>
            </div>
          </div>

          <div className={styles["room-box"]}>
            {roomData && roomData.map((v, i) => <Room key={i} roomData={v} />)}
          </div>
        </main>
      </div>
    </>
  );
}
