import React, { useEffect } from 'react';
import { HiOutlineDownload } from 'react-icons/hi';
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { refreshAtom, studentListAtom } from '../store/student';
import { useNavigate } from 'react-router-dom';

export default function StudentList() {
  const setRefresh = useSetRecoilState(refreshAtom);

  useEffect(() => {
    setRefresh(prev => prev + 1);
  }, []);

  const studentsLoadable = useRecoilValueLoadable(studentListAtom);
  const navigate = useNavigate();

  function downloadJSON(data, filename = 'students.json') {
    const cleanedData = data.map(({ password, ...rest }) => rest);
    const jsonString = JSON.stringify(cleanedData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-semibold text-blue-700">
            Live Student Update <span className="text-green-500">●</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            {studentsLoadable.state === 'hasValue' && (
              <button
                onClick={() => downloadJSON(studentsLoadable.contents)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
              >
                <HiOutlineDownload className="inline mr-2 text-xl" /> Export Data
              </button>
            )}
            <button
              onClick={() => navigate('/add-student')}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm"
            >
              + Add Student
            </button>
          </div>
        </div>

        {/* Student Cards */}
        <div className="space-y-4 overflow-y-auto max-h-[80vh] pr-2">
          {studentsLoadable.state === 'loading' &&
            Array.from({ length: 5 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-lg shadow animate-pulse flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                  <div>
                    <div className="w-32 h-4 bg-gray-200 rounded mb-2" />
                    <div className="w-24 h-3 bg-gray-200 rounded" />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm">
                  <div className="w-20 h-3 bg-gray-200 rounded" />
                  <div className="w-20 h-3 bg-gray-200 rounded" />
                </div>
              </div>
            ))}

          {studentsLoadable.state === 'hasError' && (
            <div className="text-red-500 text-lg">Error loading students.</div>
          )}

          {studentsLoadable.state === 'hasValue' &&
            studentsLoadable.contents.length > 0 &&
            studentsLoadable.contents.map((student) => (
              <div
                key={student.id}
                onClick={() => navigate(`/student/${student.registrationNumber}`)}
                className="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer hover:shadow-md transition gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src="/Images/avtar.png"
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{student.name}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      {student.feeStatus === 'Paid' ? '🟢' : '🟡'} Fee {student.feeStatus}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-6 text-gray-600 text-sm">
                  <div className="flex items-center gap-2">
                    Reg. No: {student.registrationNumber}
                  </div>
                  <div className="flex items-center gap-2">
                    Hostel: {student.hostelId}
                  </div>
                </div>
              </div>
            ))}

          {studentsLoadable.state === 'hasValue' && studentsLoadable.contents.length === 0 && (
            <div className="text-center text-gray-500 text-lg">
              No students found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
