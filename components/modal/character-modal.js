import styles from "@/styles/character-modal.module.css";
import Image from "next/image";
import charcterData from "@/data/character.json";
import { useState, useEffect } from "react";

export default function CharacterModal({ setOpenModal, openModal }) {
  const [character, setCharacter] = useState([]);
  const [isChosen, setIsChosen] = useState("");

  // 設定所有角色圖片狀態
  useEffect(() => {
    setCharacter(charcterData);
  }, []);
  return (
    <>
      <div className={styles["modal-background"]}>
        <div className={styles["modal-container"]}>
          <div className={styles["modal-header"]}>請選擇角色頭像</div>
          <div className={styles["modal-body"]}>
            {character.map((v, i) => (
              <Image
                src={v.src}
                alt="user"
                width={200}
                height={200}
                className={`${styles["user-img"]} ${
                  v.id === isChosen ? styles["img-active"] : ""
                }`}
                key={v.id}
                onClick={() => {
                  setIsChosen(v.id);
                }}
              />
            ))}
          </div>

          <div className={styles["modal-footer"]}>
            <button
              className={styles["btn-cancel"]}
              onClick={() => {
                setOpenModal(false);
              }}
            >
              取消
            </button>
            <button className={styles["btn-choose"]}>選擇圖片</button>
          </div>
        </div>
      </div>
    </>
  );
}
