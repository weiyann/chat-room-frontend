// server
export const API_SERVER = "http://localhost:3006";

// 會員註冊
export const REGIST = API_SERVER + "/api/regist"; // post

// 會員登入
export const LOGIN = API_SERVER + "/api/login"; // post

// 取得所有房間
export const ROOM_LIST = API_SERVER + "/room"; // get

// 創建房間
export const CREATE_ROOM = API_SERVER + "/room/create-room"; // post

// 取得單一房間資料
export const CHATROOM = API_SERVER + "/room/chatroom"; // get

// 更換圖片
export const CHANGE_IMG = API_SERVER + "/change-img"; // put

// 進入房間
export const ENTER_ROOM = API_SERVER + "/room/enter-room"; // post
