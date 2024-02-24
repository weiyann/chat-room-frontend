import styles from "@/styles/character-modal.module.css";
import Image from "next/image";
import charcterData from "@/data/character.json";
import { useState, useEffect } from "react";

export default function CharacterModal({
  setOpenModal,
  openModal,
  isChosen,
  setIsChosen,
}) {
  const [character, setCharacter] = useState([]);
  const [chosen, setChosen] = useState({});

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
                  v.id === chosen.id ? styles["img-active"] : ""
                }`}
                key={v.id}
                onClick={() => {
                  setChosen(v);
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
            <button
              className={styles["btn-choose"]}
              onClick={() => {
                setIsChosen(chosen);
                setOpenModal(false);
              }}
            >
              選擇圖片
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
