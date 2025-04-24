import React, { useRef, useState, Suspense } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { userStatusAtom } from '../store/userStatusAtom';
import { profileAtom } from '../store/profileAtom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { refreshAtom } from '../store/student';
import { backendUrl } from '../config';
const StudentLogin = () => {
  const setRefresh = useSetRecoilState(refreshAtom);
  const regRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState({ registrationNumber: '', password: '' });
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [loading, setLoading] = useState(false); // Track loading state

  const setUserStatus = useSetRecoilState(userStatusAtom);
  const setProfile = useSetRecoilState(profileAtom);
  const navigate = useNavigate();

  // Validation function
  const validate = () => {
    const regNo = regRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    let valid = true;
    const newErrors = { registrationNumber: '', password: '' };

    if (!regNo) {
      newErrors.registrationNumber = 'Registration number is required';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Submit handler
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true); // Set loading state to true during login
    try {
      const res = await axios.post(`${backendUrl}/api/student/login`, {
        registrationNumber: regRef.current.value,
        password: passwordRef.current.value,
      });

      const response = res.data;

      if (response.status === 200) {
        const user = {
          islogin: true,
          role: 'student',
        };

        setUserStatus(user);
        localStorage.setItem('userStatus', JSON.stringify(user));

        setProfile(response.data);
        localStorage.setItem('profile', JSON.stringify(response.data));
        setRefresh(prev => prev + 1);
        navigate('/student-dashboard');
      } else {
        setShowErrorModal(true);
      }
    } catch (err) {
      setShowErrorModal(true);
    } finally {
      setLoading(false); // Set loading state back to false after request
    }
  };

  return (
    <div className="p-8 sm:p-20 flex items-center justify-center bg-[#FAF9F6]">
      <Suspense fallback={<LoadingSkeleton />}>
        <div className="bg-white rounded-2xl shadow-md p-6 md:py-20 flex flex-col md:flex-row w-full max-w-5xl">
          {/* Left */}
          <div className="hidden md:w-1/2 md:flex flex-col items-center gap-4">
            <div className="w-3xs">
              <img
                src="Images/sudent-illustration.jpg"
                alt="Student Illustration"
                className="w-full h-auto"
              />
              <div className="mt-4 text-center">
                <Link to="/login" className="text-sm text-gray-700 underline">
                  Admin? Go back to Admin Login
                </Link>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="md:w-1/2 w-full flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Student Login</h2>

            <form onSubmit={submitHandler} className="space-y-4 flex flex-col gap-4">
              <div className={`flex items-center border-b py-2 ${errors.registrationNumber ? 'border-red-500' : 'border-gray-300'}`}>
                <FaUser className="text-gray-400 mr-2" />
                <input
                  ref={regRef}
                  type="text"
                  placeholder="Registration Number"
                  autoComplete="username"
                  className="outline-none w-full"
                />
              </div>
              {errors.registrationNumber && <p className="text-red-500 text-sm -mt-2">{errors.registrationNumber}</p>}

              <div className={`flex items-center border-b py-2 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}>
                <FaLock className="text-gray-400 mr-2" />
                <input
                  ref={passwordRef}
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  className="outline-none w-full"
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm -mt-2">{errors.password}</p>}

              <button
                type="submit"
                className={`w-1/3 bg-blue-500 text-white py-2 rounded-md transition ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Log in'}
              </button>
            </form>
          </div>
        </div>
      </Suspense>

      {showErrorModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4 text-red-600">Login Failed</h2>
            <p className="text-gray-700 mb-4">Invalid registration number or password.</p>
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

// Skeleton Loader Component
const LoadingSkeleton = () => (
  <div className="w-full max-w-5xl mx-auto flex gap-4">
    <div className="hidden md:w-1/2 md:flex flex-col items-center gap-4">
      <Skeleton width="100%" height={200} />
      <Skeleton width="80%" height={40} />
    </div>
    <div className="md:w-1/2 w-full flex flex-col justify-center">
      <Skeleton width="60%" height={40} />
      <Skeleton width="100%" height={50} />
      <Skeleton width="100%" height={50} />
      <Skeleton width="50%" height={40} />
    </div>
  </div>
);

export default StudentLogin;
