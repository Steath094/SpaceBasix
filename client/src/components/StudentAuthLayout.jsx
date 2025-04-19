import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { userStatusAtom } from '../store/userStatusAtom'
function StudentAuthLayout({
    children,
    authentication= true
}) {
    const navigate = useNavigate()
    const [loader,setLoader] = useState(true)
    const userStatus = useRecoilValue(userStatusAtom)
    console.log(userStatus);
    const authStatus =userStatus.islogin && userStatus.role=="student";
    useEffect(()=>{
        if (authentication && authStatus !==authentication) {
            navigate("/student-login")
        }else if(!authentication && authStatus!==authentication){
            navigate("/student-dashboard")
        }
        setLoader(false)
    },[authStatus, authentication, navigate])
    return loader ? <h1>Loading...</h1> : <>{children}</>
}

export default StudentAuthLayout