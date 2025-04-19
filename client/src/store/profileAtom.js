import {atom} from 'recoil'

export const profileAtom = atom({
    key:'profileAtom',
    default: JSON.parse(localStorage.getItem("profile"))||{}
})