import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValueLoadable } from 'recoil'; // if using recoil state management
import { backendUrl } from '../config';
const StudentDetails = () => {
  const { regNo } = useParams(); // Grabs the student ID from the URL
  const [student, setStudent] = useState(null);

  // Simulating fetching student details
  useEffect(() => {
    // Replace this with your actual fetching logic or API call
    const fetchStudentDetails = async () => {
      // Example: You might use Recoil or directly fetch data from an API
      const response = await fetch(`${backendUrl}/api/student/${regNo}`);
      const data = await response.json();
      setStudent(data.data);
    };

    fetchStudentDetails();
  }, [regNo]);
console.log(student);

if (!student) {
    return (
      <div className="space-y-6 p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        {/* Skeleton Loading Placeholder */}
        <div className="h-8 bg-blue-100 rounded-md animate-pulse mb-4"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-blue-100 p-6 rounded-lg shadow-md animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-semibold text-blue-600 mb-6">Student Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Personal Information</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <p className="text-lg font-medium text-gray-700">Name</p>
              <p className="text-lg text-gray-600">{student.name}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-lg font-medium text-gray-700">Registration Number</p>
              <p className="text-lg text-gray-600">{student.registrationNumber}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-lg font-medium text-gray-700">Email</p>
              <p className="text-lg text-gray-600">{student.email}</p>
            </div>
          </div>
        </div>

        {/* Fee Status */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Fee Status</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <p className="text-lg font-medium text-gray-700">Fee Status</p>
              <p className={`text-lg font-medium ${student.feeStatus === 'Paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                {student.feeStatus}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hostel and Room Details */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Hostel & Room Information</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <p className="text-lg font-medium text-gray-700">Hostel ID</p>
            <p className="text-lg text-gray-600">{student.hostelId}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-lg font-medium text-gray-700">Room ID</p>
            <p className="text-lg text-gray-600">{student.roomId}</p>
          </div>
        </div>
      </div>
    </div>
  );

};

export default StudentDetails;
