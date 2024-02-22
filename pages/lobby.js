import React from "react";
import styles from "@/styles/lobby.module.css";
import Header from "@/components/layout/header";
import Image from "next/image";
import Room from "@/components/room";
import { FaDoorOpen } from "react-icons/fa6";

export default function Lobby() {
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
            <Room />
            <Room />
            <Room />
            <Room />
            <Room />
            <Room />
            <Room />
            <Room />
            <Room />
            <Room />
            <Room />
          </div>
        </main>
      </div>
    </>
  );
}
