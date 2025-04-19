import React from 'react';
import { ExternalLink, ShieldUser, UserX } from 'lucide-react';
import { useRecoilValueLoadable } from 'recoil';
import { studentListAtom } from '../../store/student';
import { useNavigate } from 'react-router-dom';

const StudentUpdateCard = () => {
  const studentListLoadable = useRecoilValueLoadable(studentListAtom);
  const navigate = useNavigate();

  // Loading state
  if (studentListLoadable.state === 'loading') {
    return (
      <div className="max-w-sm w-full mx-auto h-full">
        <div className="flex flex-col gap-4 mb-6">
          <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        <div className="bg-white border-2 border-blue-500 rounded-xl shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-100 rounded-xl animate-pulse">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="w-24 h-3 bg-gray-300 rounded"></div>
                  <div className="w-16 h-2 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (studentListLoadable.state === 'hasError') {
    return (
      <div className="text-center text-red-500 bg-white p-4 rounded-xl shadow-md">
        Failed to load student updates.
      </div>
    );
  }

  const studentList = studentListLoadable.contents;

  return (
    <div className="max-w-sm w-full mx-auto h-full">
      {/* Add/Remove Buttons */}
      <div className="flex flex-col gap-4 mb-6">
        <button
          onClick={() => navigate('/add-student')}
          className="border-2 border-cyan-500 text-cyan-600 font-medium py-2 rounded-lg hover:bg-cyan-50 transition"
        >
          + Add Student
        </button>
      </div>

      {/* Card Container */}
      <div className="bg-white border-2 border-blue-500 rounded-xl shadow p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-md font-semibold text-gray-800">Student Update</h3>
          <ExternalLink size={14} className="text-gray-500" />
        </div>

        {/* Update List */}
        {studentList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-gray-500 text-sm gap-2">
            <UserX size={32} className="text-blue-400" />
            <p>No students found.</p>
            <p className="text-xs text-gray-400">Try adding a student to see updates here.</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {studentList.map((item, index) => (
              <div
                key={index}
                className="bg-blue-50 rounded-xl px-3 py-2 flex items-center gap-3 shadow-sm"
              >
                <img
                  src="Images/avtar.png"
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white"
                />
                <div className="flex flex-col text-sm">
                  <span className="text-gray-800 font-medium">{item.name}</span>
                  <div className="flex items-center text-gray-500 text-xs gap-1">
                    <ShieldUser size={16} />
                    {item.registrationNumber}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentUpdateCard;
