import React, { useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { FaUserGraduate } from 'react-icons/fa';
import { profileAtom } from '../store/profileAtom';
import { refreshAtom } from '../store/student';
export default function AddStudent() {
  const refresh = useSetRecoilState(refreshAtom);
  const hostelId = useRecoilValue(profileAtom)?.id;
  
  const navigate = useNavigate();

  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const registrationNumberRef = useRef();
  const passwordRef = useRef();
  const roomIdRef = useRef();
  const feeStatusRef = useRef();

  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [studentInfo, setStudentInfo] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    const studentData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      registrationNumber: registrationNumberRef.current.value,
      password: passwordRef.current.value,
      roomid: roomIdRef.current.value,
      feeStatus: feeStatusRef.current.value,
      hostelId: hostelId,
    };

    try {
      const response = await fetch('http://localhost:8080/api/student/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) {
        throw new Error('Failed to register student');
      }

      const result = await response.json();
      refresh(prev => prev + 1);

      setStudentInfo({
        registrationNumber: studentData.registrationNumber,
        password: studentData.password,
      });
      setModalOpen(true);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white shadow-md rounded-xl">
        <h2 className="text-2xl font-semibold text-blue-700 text-center mb-6">
          <FaUserGraduate className="inline text-blue-600 mr-2" />
          Add New Student
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <input ref={nameRef} type="text" required placeholder="Name" className="mt-1 px-4 py-2 w-full border rounded-md text-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            <input ref={emailRef} type="email" required placeholder="Email" className="mt-1 px-4 py-2 w-full border rounded-md text-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            <input ref={phoneRef} type="tel" required placeholder="Phone" className="mt-1 px-4 py-2 w-full border rounded-md text-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            <input ref={registrationNumberRef} type="text" required placeholder="Registration Number" className="mt-1 px-4 py-2 w-full border rounded-md text-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            <input ref={passwordRef} type="text" required placeholder="Password" className="mt-1 px-4 py-2 w-full border rounded-md text-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            <input ref={roomIdRef} type="text" required placeholder="Room ID" className="mt-1 px-4 py-2 w-full border rounded-md text-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            <select ref={feeStatusRef} required className="mt-1 px-4 py-2 w-full border  rounded-md text-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500">
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register Student'}
          </button>
        </form>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-8 w-[90%] max-w-md">
            <h3 className="text-xl font-semibold text-blue-700 mb-4 text-center">Student Registered</h3>
            <p className="text-gray-700 mb-2">
              <strong>Registration Number:</strong> {studentInfo.registrationNumber}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Password:</strong> {studentInfo.password}
            </p>
            <button
              onClick={() => {
                setModalOpen(false);
                navigate(`/student/${studentInfo.registrationNumber}`);
              }}
              className="w-full mt-2 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Go to Student Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Tailwind input style shortcut
const inputClass = 'mt-1 px-4 py-2 w-full border rounded-md text-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500';
// You can put this class in your global styles if you're reusing it frequently
