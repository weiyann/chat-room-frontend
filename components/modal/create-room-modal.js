import React from "react";
import styles from "@/styles/create-room-modal.module.css";
import categoryData from "@/data/category.json";
import { useState, useContext } from "react";
import AuthContext from "@/context/authContext";
import { CREATE_ROOM } from "@/configs";
import { useRouter } from "next/router";

export default function CreateRoomModal({ setOpenModal }) {
  const router = useRouter();
  const { auth } = useContext(AuthContext);
  // 創造房間的表單狀態
  const [createRoomForm, setCreateRoomForm] = useState({
    user_id: auth.user_id,
    category_id: "1",
    room_name: "",
    usePassword: false,
    room_password: "",
  });
  const createRoom = async () => {
    // 表單的驗證
    if (
      !createRoomForm.room_name ||
      (createRoomForm.usePassword && !createRoomForm.room_password)
    ) {
      alert("請填寫正確的資料");
      return;
    }

    try {
      const res = await fetch(CREATE_ROOM, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          createRoomForm,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setOpenModal(false);
        // 創建成功直接進入房間
        router.push(`/${data.room_id}`);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <>
      <div className={styles["modal-background"]}>
        <div className={styles["modal-container"]}>
          <div className={styles["modal-header"]}>創建房間</div>
          <div className={styles["modal-body"]}>
            <div className={styles["input-box"]}>
              <label htmlFor="room_name" className={styles["input-box"]}>
                房間名稱：
                <input
                  type="text"
                  className={styles["text-input"]}
                  value={createRoomForm.room_name}
                  onChange={(e) => {
                    setCreateRoomForm({
                      ...createRoomForm,
                      room_name: e.target.value,
                    });
                  }}
                />
              </label>
            </div>
            <div className={styles["input-box"]}>
              <label htmlFor="category">
                分類：
                <select
                  name="category"
                  id="category"
                  className={styles["text-input"]}
                  onChange={(e) => {
                    setCreateRoomForm({
                      ...createRoomForm,
                      category_id: e.target.value,
                    });
                  }}
                >
                  {categoryData.map((v, i) => (
                    <option value={v.category_id} key={v.category_id}>
                      {v.category_name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className={styles["input-box"]}>
              設定密碼：
              <div className={styles["password-radio"]}>
                <label htmlFor="password-yes">
                  是
                  <input
                    type="radio"
                    name="password-yes"
                    id="password-yes"
                    checked={createRoomForm.usePassword}
                    onChange={(e) => {
                      setCreateRoomForm({
                        ...createRoomForm,
                        usePassword: true,
                      });
                    }}
                  />
                </label>
                <label htmlFor="password-no">
                  否
                  <input
                    type="radio"
                    name="password-no"
                    id="password-no"
                    checked={!createRoomForm.usePassword}
                    onChange={(e) => {
                      setCreateRoomForm({
                        ...createRoomForm,
                        usePassword: false,
                      });
                    }}
                  />
                </label>
              </div>
            </div>
            <div className={styles["input-box"]}>
              <label htmlFor="password">
                密碼：
                <input
                  type="password"
                  className={styles["text-input"]}
                  disabled={!createRoomForm.usePassword}
                  value={createRoomForm.room_password}
                  onChange={(e) => {
                    setCreateRoomForm({
                      ...createRoomForm,
                      room_password: e.target.value,
                    });
                  }}
                />
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
                createRoom();
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
