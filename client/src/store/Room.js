import axios from "axios";
import { atom, atomFamily, selector } from "recoil";
import { profileAtom } from "./profileAtom";
import { refreshAtom } from "./student";

export const roomListAtom = atom({
    key:'roomListAtom',
    default: selector({
        key:'roomListAtomSelector',
        get: async ({get}) =>{
            const refresh = get(refreshAtom)
            const profile = get(profileAtom); // ✅ properly track dependency
            const hostelId = profile.id;
            if (!hostelId) return []; // Graceful fallback
  
              
            const res = await axios.get(`http://localhost:8080/api/room/hostel/${hostelId}`)
            console.log(res);
            
            return res.data.data || [];
        }
    })
})
// export const studentDashboard = selector({
//     key:'studentDashboard',
//     get: ({get}) =>{
//         const studentList = get(studentListAtom)
//         const total = studentList.length;
//         const inHostel = total; // assuming all are in hostel for now
//         const outsideHostel = 0; // fixed for now
//         const assigned = studentList.filter(s => s.hostelId && s.hostelId.trim() !== "").length;
//         const removed = studentList.filter(s => !s.hostelId || s.hostelId.trim() === "").length;
//         const feeDefaulters = studentList.filter(s => s.feeStatus === 'pending' || s.feeStatus === 'unpaid').length;

//         const studentdata = [
//         {
//             title: "Total Student",
//             number: total,
//             color:'black'
//         },
//         {
//             title: "In Hostel",
//             number: inHostel,
//             color:'cyan-400'
//         },
//         {
//             title: "Outside Hostel",
//             number: outsideHostel,
//             color:'gray-400'
//         },
//         {
//             title: "Sudents Assigned",
//             number: assigned,
//             color: 'pink-400'
//         },
//         {
//             title: "Students Removed",
//             number: removed,
//             color:'red-500'
//         }
//         ];
//         return studentdata;
//     }
// })
// export const feeDefaulterSelector = selector({
//     key:'feeDefaultersSelector',
//     get: ({get})=>{
//         const studentList = get(studentListAtom)
//         const feeDefaulterCount = studentList.filter(s => s.feeStatus === 'pending' || s.feeStatus === 'unpaid').length;
//         return {
//             title: "Fees defaulters",
//             number: feeDefaulterCount
//         }
//     }
// })