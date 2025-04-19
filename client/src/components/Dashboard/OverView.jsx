import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { feeDefaulterSelector, studentDashboard } from '../../store/student';

function OverView() {
  const studentdataLoadable = useRecoilValueLoadable(studentDashboard);
  const feeDefaultersLoadable = useRecoilValueLoadable(feeDefaulterSelector);

  if (studentdataLoadable.state === 'loading' || feeDefaultersLoadable.state === 'loading') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-white rounded-2xl p-4 gap-4 shadow-md animate-pulse">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-4 border-2 border-gray-200 rounded-xl h-24 bg-gray-100" />
        ))}
        <div className="p-4 border-2 border-gray-200 rounded-xl h-full bg-gray-100" />
      </div>
    );
  }

  if (studentdataLoadable.state === 'hasError' || feeDefaultersLoadable.state === 'hasError') {
    return (
      <div className="text-center text-red-500 bg-white p-4 rounded-xl shadow-md">
        Something went wrong while loading dashboard data.
      </div>
    );
  }

  const studentdata = studentdataLoadable.contents;
  const feeDefaulters = feeDefaultersLoadable.contents;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 bg-white rounded-2xl p-4 gap-4 shadow-md">
      {/* Main Cards */}
      <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {studentdata.map((item, index) => (
          <div key={index} className="p-4 border-2 border-gray-200 rounded-xl">
            <p className="flex items-center gap-1.5 text-sm sm:text-base font-medium">
              {item.title}
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16px"
                  viewBox="0 -960 960 960"
                  width="16px"
                  fill="#000000"
                >
                  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
                </svg>
              </span>
            </p>
            <p className={`text-2xl font-bold text-${item.color}`}>{item.number}</p>
          </div>
        ))}
      </div>

      {/* Fee Defaulters Card */}
      <div className="h-full">
        <div className="p-4 border-2 border-gray-200 rounded-xl h-full flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-1.5 text-sm sm:text-base font-medium">
              {feeDefaulters.title}
            </p>
            <p className="text-2xl font-bold text-yellow-400">{feeDefaulters.number}</p>
          </div>
          <div className="w-full">
            <button className="w-full py-2 px-6 bg-[#2489D3] rounded-xl text-white font-semibold text-base sm:text-lg">
              View List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverView;
