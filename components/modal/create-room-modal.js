import React from "react";
import styles from "@/styles/create-room-modal.module.css";
import categoryData from "@/data/category.json";

export default function CreateRoomModal({ setOpenModal }) {
  return (
    <>
      <div className={styles["modal-background"]}>
        <div className={styles["modal-container"]}>
          <div className={styles["modal-header"]}>創建房間</div>
          <div className={styles["modal-body"]}>
            <div className={styles["input-box"]}>
              <label htmlFor="room_name" className={styles["input-box"]}>
                房間名稱：
                <input type="text" className={styles["text-input"]} />
              </label>
            </div>
            <div className={styles["input-box"]}>
              <label htmlFor="category">
                分類：
                <select
                  name="category"
                  id="category"
                  className={styles["text-input"]}
                >
                  {categoryData.map((v, i) => (
                    <option value="" key={v.category_id}>
                      {v.category_name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className={styles["input-box"]}>
              設定密碼：
              <div className={styles["password-radio"]}>
                <label htmlFor="password-radio">
                  是
                  <input
                    type="radio"
                    name="password-radio"
                    id="password-radio"
                  />
                  否
                  <input
                    type="radio"
                    name="password-radio"
                    id="password-radio"
                  />
                </label>
              </div>
            </div>
            <div className={styles["input-box"]}>
              <label htmlFor="password">
                密碼：
                <input type="password" className={styles["text-input"]} />
              </label>
            </div>
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
                setOpenModal(false);
              }}
            >
              創建
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
