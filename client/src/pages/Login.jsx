import React, { useRef, useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { userStatusAtom } from '../store/userStatusAtom';
import { profileAtom } from '../store/profileAtom';
import { refreshAtom } from '../store/student';

const Login = () => {
  const setRefresh = useSetRecoilState(refreshAtom
      );
  const emailRef = useRef();
  const passwordRef = useRef();
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const setUserStatus = useSetRecoilState(userStatusAtom)
  const setProfile = useSetRecoilState(profileAtom)
  const navigate = useNavigate();
  const validate = () => {
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    let valid = true;
    const newErrors = { email: '', password: '' };

    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!validate()) return;
  
    try {
      const res = await axios.post('http://localhost:8080/api/admin/login', {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      const response = res.data;
  
      if (response.status === 200) {
        console.log('Login successful:', response);
  
        const user = {
          islogin: true,
          role: "admin"
        };
  
        setUserStatus(user);
        localStorage.setItem("userStatus", JSON.stringify(user));
        
        setProfile(response.data);
        localStorage.setItem("profile", JSON.stringify(response.data));
        setRefresh(prev => prev + 1);
        navigate('/admin-dashboard');
      } else {
        setShowErrorModal(true);
      }
    } catch (err) {
      setShowErrorModal(true);
    }
  };
  

  return (
    <div className="sm:p-20 p-8 flex items-center justify-center bg-[#FAF9F6]">
      <div className="bg-white rounded-2xl shadow-md p-6 md:py-20 flex flex-col md:flex-row w-full max-w-5xl">

        <div className="hidden md:w-1/2 md:flex flex-col items-center gap-4">
          <div className='w-3xs'>
            <img
              src="Images/signin-image.jpg"
              alt="Illustration"
              className="w-full h-auto"
            />    
            <div className="mt-4 text-center">
              <Link to={'/signup'} className="text-sm text-gray-700 underline">
                Create an account?
              </Link>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 w-full flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Login</h2>

          <form onSubmit={submitHandler} className="space-y-4 flex flex-col gap-4">
            <div className={`flex items-center border-b py-2 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}> 
              <FaUser className="text-gray-400 mr-2" />
              <input
                ref={emailRef}
                name='email'
                type="text"
                placeholder="Your Email"
                className="outline-none w-full"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm -mt-2">{errors.email}</p>}

            <div className={`flex items-center border-b py-2 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}>
              <FaLock className="text-gray-400 mr-2" />
              <input
                ref={passwordRef}
                name='password'
                type="password"
                placeholder="Password"
                className="outline-none w-full"
              />
            </div>
            {errors.password && <p className="text-red-500 text-sm -mt-2">{errors.password}</p>}

            <div className="flex items-center space-x-2">
              <input type="checkbox" />
              <label className="text-sm text-gray-600">Remember me</label>
            </div>

            <button
              type="submit"
              className="w-1/3 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              Log in
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Not an admin?{' '}
              <a
                href="/student-login"
                className="inline-block text-[#2489D3] font-medium transition duration-200 hover:text-blue-800 hover:underline"
              >
                Log in as a student
              </a>
            </p>
          </div>
        </div>
      </div>

      {showErrorModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
          <h2 className="text-lg font-semibold mb-4 text-red-600">Login Failed</h2>
          <p className="text-gray-700 mb-4">Invalid email or password. Please try again.</p>
          <button
            onClick={() => setShowErrorModal(false)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
      )}
    </div>
  );
};

export default Login;