import React, { useEffect, useState } from 'react';
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { complaintsListAtom } from '../store/Complaints';
import { useNavigate } from 'react-router-dom';
import { refreshAtom } from '../store/student';

const Complaints = () => {
  const setRefresh = useSetRecoilState(refreshAtom);

  useEffect(() => {
    setRefresh(prev => prev + 1);
  }, []);

  const navigate = useNavigate();
  const complaintsLoadable = useRecoilValueLoadable(complaintsListAtom);
  const [filter, setFilter] = useState('all');

  const transformComplaintsData = (complaints) => {
    return complaints.map((complaint) => ({
      id: complaint.id,
      title: complaint.message,
      status: complaint.status.toLowerCase(),
      studentRegNo: complaint.studentRegNo,
      roomNumber: complaint.roomNumber,
      hostelId: complaint.hostelId,
    }));
  };

  let content;

  if (complaintsLoadable.state === 'loading') {
    content = <p className="p-4">Loading complaints...</p>;
  } else if (complaintsLoadable.state === 'hasError') {
    content = <p className="p-4 text-red-600">Failed to load complaints.</p>;
  } else {
    const complaints = transformComplaintsData(complaintsLoadable.contents);
    const filteredComplaints =
      filter === 'all' ? complaints : complaints.filter((c) => c.status === filter);

    if (filteredComplaints.length === 0) {
      content = (
        <p className="p-4 text-gray-600 italic">
          {filter === 'all'
            ? 'No complaints available.'
            : `No ${filter.replace('_', ' ')} complaints.`}
        </p>
      );
    } else {
      content = (
        <div className="space-y-4 max-h-[80vh] overflow-y-scroll pr-2">
          {filteredComplaints.map((complaint) => (
            <div
              key={complaint.id}
              onClick={() => navigate(`/complaint/${complaint.id}`)}
              className="p-4 bg-white rounded-lg shadow flex flex-col sm:flex-row justify-between items-start sm:items-center cursor-pointer hover:shadow-md transition"
            >
              <div className="text-lg font-medium">{complaint.title}</div>
              <div
                className={`mt-2 sm:mt-0 text-sm font-semibold px-3 py-1 rounded-full ${
                  complaint.status === 'resolved'
                    ? 'bg-green-100 text-green-700'
                    : complaint.status === 'in_progress'
                    ? 'bg-yellow-100 text-yellow-700'
                    : complaint.status === 'pending'
                    ? 'bg-orange-100 text-orange-700'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {complaint.status.replace('_', ' ').toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      );
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#f1f5ff] text-gray-800">
      {/* Sidebar Filters */}
      <div className="w-full md:w-1/4 lg:w-1/5 bg-white shadow-md p-4 md:p-6 space-y-3 md:space-y-4">
        {['all', 'resolved', 'in_progress', 'pending'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`w-full py-2 rounded-lg font-medium transition text-sm ${
              filter === type
                ? 'bg-blue-500 text-white'
                : 'bg-blue-100 text-blue-800'
            }`}
          >
            {type === 'all'
              ? 'Total Complaints'
              : type.replace('_', ' ').replace(/^\w/, (c) => c.toUpperCase())}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="w-full md:w-3/4 lg:w-4/5 p-4 md:p-6 overflow-y-auto">
        <h1 className="text-2xl md:text-3xl font-semibold mb-4">Complaints</h1>
        {content}
      </div>
    </div>
  );
};

export default Complaints;
