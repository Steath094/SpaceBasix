import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import StudentLogin from './pages/Studentlogin.jsx'
import { RecoilRoot } from 'recoil'
import AdminDashboard from './pages/AdminDashboard.jsx'
import AuthLayout from './components/AdminAuthLayout.jsx'
import Room from './pages/Room.jsx'
import StudentList from './pages/StudentList.jsx'
import Complaints from './pages/Complaints.jsx'
import StudentAuthLayout from './components/StudentAuthLayout.jsx'
import StudentDashboard from './pages/StudentDashboard.jsx'
import RoomDetails from './pages/RoomDetails.jsx'
import StudentDetails from './pages/StudentDetails.jsx'
import ComplaintDetails from './pages/ComplaintDetails.jsx'
import AddStudent from './pages/AddStudent.jsx'
import AddRoom from './pages/AddRoom.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Landing />,
        },
        {
            path: "/login",
            element: (
                    <Login />
            ),
        },
        {
            path: "/signup",
            element: (
                    <Signup />
            ),
        },
        {
            path: "/student-login",
            element: (
                    <StudentLogin />
            ),
        },
        {
            path: "/admin-dashboard",
            element: (
                <AuthLayout authentication={true}>
                    <AdminDashboard/>   
                </AuthLayout>
                    
            ),
        },
        {
            path: "/rooms",
            element: (
                <AuthLayout authentication={true}>
                    <Room/> 
                </AuthLayout>
            ),
        },
        {
            path: "/students",
            element: (
                <AuthLayout authentication={true}>
                    <StudentList/> 
                </AuthLayout>
            ),
        },
        {
            path: "/complaints",
            element: (
                <AuthLayout authentication={true}>
                    <Complaints/>
                </AuthLayout>
            ),
        },
        {
            path: "/room/:id",
            element: (
                <AuthLayout authentication={true}>
                    <RoomDetails/>
                </AuthLayout>
            ),
        },
        {
            path: "/student/:regNo",
            element: (
                <AuthLayout authentication={true}>
                    <StudentDetails/>
                </AuthLayout>
            ),
        },
        {
            path: "/complaint/:id",
            element: (
                <AuthLayout authentication={true}>
                    <ComplaintDetails/>
                </AuthLayout>
            ),
        },
        {
            path: "/add-student",
            element: (
                <AuthLayout authentication={true}>
                    <AddStudent/>
                </AuthLayout>
            ),
        },
        {
            path: "/add-room",
            element: (
                <AuthLayout authentication={true}>
                    <AddRoom/>
                </AuthLayout>
            ),
        },
        {
            path: "student-dashboard",
            element: (
                <StudentAuthLayout authentication={false}>
                    <StudentDashboard/>
                </StudentAuthLayout>
            )
        },
        
    ],
},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RecoilRoot>
      <RouterProvider router={router}/>
    </RecoilRoot>

  </StrictMode>,
)
