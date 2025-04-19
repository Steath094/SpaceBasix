import { atom } from "recoil";

export const userStatusAtom = atom({
    key:"userStatusAtom",
    default:JSON.parse(localStorage.getItem("userStatus")) || {
        islogin: false,
        role: null
    }
})