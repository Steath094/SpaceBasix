import axios from "axios";
import { atom, atomFamily, selector } from "recoil";
import { refreshAtom } from "./student";
import { profileAtom } from "./profileAtom";

export const complaintsListAtom = atom({
    key:'complaintsListAtom',
    default: selector({
        key:'complaintsListAtomSelector',
        get: async ({get}) =>{
            const refresh = get(refreshAtom)
            const profile = get(profileAtom); // ✅ properly track dependency
            const hostelId = profile?.id;
              
            if (!hostelId) return [];
            const res = await axios.get(`http://localhost:8080/api/complaints/hostel/${hostelId}`)
            return res.data.data;
        }
    })
})