import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { userStatusAtom } from '../store/userStatusAtom'
function AdminAuthLayout({
    children,
    authentication= true
}) {
    const navigate = useNavigate()
    const [loader,setLoader] = useState(true)
    const userStatus = useRecoilValue(userStatusAtom)
    console.log(userStatus.role);
    const authStatus = userStatus.islogin && userStatus.role==="admin";
    useEffect(()=>{
        if (authentication && authStatus !==authentication) {
            navigate("/login")
        }else if(!authentication && authStatus!==authentication){
            navigate("/")
        }
        setLoader(false)
    },[authStatus, authentication, navigate])
    return loader ? <h1>Loading...</h1> : <>{children}</>
}

export default AdminAuthLayout