import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ComplaintDetails = () => {
  const { id } = useParams(); // Grabs the complaint ID from the URL
  const [complaint, setComplaint] = useState(null);

  // Simulating fetching complaint details
  useEffect(() => {
    // Replace this with your actual fetching logic or API call
    const fetchComplaintDetails = async () => {
      // Example: You might use Recoil or directly fetch data from an API
      const response = await fetch(`http://localhost:8080/api/complaints/${id}`);
      const data = await response.json();
      console.log(response);
      
      setComplaint(data);
    };

    fetchComplaintDetails();
  }, [id]);

  if (!complaint) {
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
      <h1 className="text-4xl font-semibold text-blue-600 mb-6">Complaint Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Complaint Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Complaint Information</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <p className="text-lg font-medium text-gray-700">Message</p>
              <p className="text-lg text-gray-600">{complaint.message}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-lg font-medium text-gray-700">Room Number</p>
              <p className="text-lg text-gray-600">{complaint.roomNumber}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-lg font-medium text-gray-700">Student Reg No</p>
              <p className="text-lg text-gray-600">{complaint.studentRegNo}</p>
            </div>
          </div>
        </div>

        {/* Status Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Status</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <p className="text-lg font-medium text-gray-700">Complaint Status</p>
              <p
                className={`text-lg font-medium ${
                  complaint.status === 'RESOLVED' ? 'text-green-600' : 'text-yellow-600'
                }`}
              >
                {complaint.status}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-lg font-medium text-gray-700">Hostel ID</p>
              <p className="text-lg text-gray-600">{complaint.hostelId}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Additional Information</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <p className="text-lg font-medium text-gray-700">Complaint Date</p>
            <p className="text-lg text-gray-600">{complaint.date || 'Not specified'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetails;
