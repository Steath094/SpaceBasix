import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { profileAtom } from '../store/profileAtom';

export default function StudentDashboard() {
  const profile = useRecoilValue(profileAtom);

  const [roomInfo, setRoomInfo] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [form, setForm] = useState({
    message: '',
    status: 'PENDING',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (profile?.id) {
      setLoading(true);
      axios.get(`http://localhost:8080/api/room/student/${profile.id}`)
        .then(res => {
          setRoomInfo(res.data.data);
          setLoading(false);
        })
        .catch(err => {
          if (err.response && err.response.status === 404) {
            setRoomInfo(null);
          } else {
            setError("Error fetching room info");
          }
          setLoading(false);
        });
    }

    if (profile?.registrationNumber) {
      fetchComplaints();
    }
  }, [profile]);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/complaints/student/${profile.registrationNumber}`);
      const data = res.data.data;
      setComplaints(Array.isArray(data) ? data : (data ? [data] : []));
    } catch (err) {
      console.error("Error fetching complaints:", err);
      setComplaints([]);
    }
  };

  const submitComplaint = async (e) => {
    e.preventDefault();
    const payload = {
      studentRegNo: profile.registrationNumber,
      studentId: profile.studentId,
      message: form.message,
      status: form.status,
      roomNumber: roomInfo?.roomNumber || '',
      hostelId: profile?.hostelId || ''
    };

    try {
      await axios.post('http://localhost:8080/api/complaints/add', payload);
      setForm({ message: '', status: 'PENDING' });
      fetchComplaints();
    } catch (err) {
      console.error("Error submitting complaint:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">

        {/* Room Info */}
        <div className="bg-white rounded-xl shadow p-6 border border-blue-100 w-full">
          <h2 className="text-lg font-semibold text-blue-700 mb-4">Room Information</h2>
          {roomInfo ? (
            <div className="space-y-2 text-gray-600">
              <div className="flex justify-between"><span className="font-medium">Room Number:</span><span className="text-blue-600">{roomInfo.roomNumber}</span></div>
              <div className="flex justify-between"><span className="font-medium">Capacity:</span><span className="text-blue-600">{roomInfo.capacity} Students</span></div>
              <div className="flex justify-between"><span className="font-medium">Cleanliness:</span><span className="text-blue-600">{roomInfo.cleanlinessStatus}</span></div>
            </div>
          ) : (
            <p className="text-gray-500">Room not assigned.</p>
          )}
        </div>

        {/* Fee Status */}
        <div className="bg-white rounded-xl shadow p-6 border border-blue-100 w-full">
          <h2 className="text-lg font-semibold text-blue-700 mb-4">Fee Status</h2>
          <p className="text-gray-600 mb-2">Last Payment: <span className="text-blue-600">₹15,000</span> on March 15, 2024</p>
          <p className="text-gray-600">Next Due: <span className="text-red-500">April 15, 2025</span></p>
        </div>

        {/* Announcements */}
        <div className="bg-white rounded-xl shadow p-6 border border-blue-100 w-full">
          <h2 className="text-lg font-semibold text-blue-700 mb-4">Announcements</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Next inspection on April 20</li>
            <li>Water supply maintenance on April 18</li>
          </ul>
        </div>

        {/* Complaint Form */}
        <div className="bg-white rounded-xl shadow p-6 border border-blue-100 w-full col-span-1">
          <h2 className="text-lg font-semibold text-blue-700 mb-4">Raise a Complaint</h2>
          <form className="space-y-4" onSubmit={submitComplaint}>
            <textarea
              placeholder="Describe your issue..."
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              rows={3}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            ></textarea>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
            </select>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit Complaint
            </button>
          </form>
        </div>

        {/* Complaint List */}
        <div className="bg-white rounded-xl shadow p-6 border border-blue-100 w-full col-span-1 sm:col-span-2 max-h-[300px] overflow-y-auto">
          <h2 className="text-lg font-semibold text-blue-700 mb-4">Your Complaints</h2>
          {complaints.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {complaints.map((complaint, idx) => (
                <li key={idx} className="py-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">{complaint.message}</p>
                    <p className="text-sm text-gray-500">Room: {complaint.roomNumber}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    complaint.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                    complaint.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {complaint.status.replace('_', ' ')}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No complaints found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
