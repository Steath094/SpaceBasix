import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useRecoilValueLoadable } from 'recoil';
import { complaintsListAtom } from '../../store/Complaints';

const ComplaintsCard = () => {
  const complaintsLoadable = useRecoilValueLoadable(complaintsListAtom);

  if (complaintsLoadable.state === 'loading') {
    // Skeleton loading state
    return (
      <div className="rounded-xl p-6 bg-white w-full max-w-4xl shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg font-semibold text-gray-800 animate-pulse">Complaints</h2>
          <ExternalLink size={14} className="text-gray-600 animate-pulse" />
        </div>
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-full md:w-1/3 h-10 bg-gray-200 rounded-full overflow-hidden animate-pulse"></div>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start md:ml-6">
            <div className="bg-blue-100 rounded-xl px-5 py-3 text-center shadow-sm animate-pulse"></div>
            <div className="bg-cyan-100 rounded-xl px-5 py-3 text-center shadow-sm animate-pulse"></div>
            <div className="bg-yellow-100 rounded-xl px-5 py-3 text-center shadow-sm animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (complaintsLoadable.state === 'hasError') {
    return (
      <div className="rounded-xl p-6 bg-white w-full max-w-4xl shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Complaints</h2>
          <ExternalLink size={14} className="text-gray-600" />
        </div>
        <div className="text-red-600 text-center py-4">Error loading complaints. Please try again later.</div>
      </div>
    );
  }

  const complaintList = complaintsLoadable.contents;
  console.log(complaintList);
  
  const total = complaintList.length;
  const resolved = complaintList.filter(complaint => complaint.status === "RESOLVED").length;
  const open = total - resolved;
  const resolvedPercentage = (resolved / total) * 100;

  return (
    <div className="rounded-xl p-6 bg-white w-full max-w-4xl shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Complaints</h2>
        <ExternalLink size={14} className="text-gray-600" />
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Progress bar */}
        <div className="w-full md:w-1/3 h-10 bg-gray-200 rounded-full overflow-hidden relative">
          <div
            className="h-full rounded-full bg-cyan-400 absolute left-0 top-0"
            style={{ width: `${resolvedPercentage}%` }}
          />
          <div
            className="h-full rounded-full bg-yellow-400 absolute right-0 top-0"
            style={{ width: `${100 - resolvedPercentage}%` }}
          />
        </div>

        {/* Info boxes */}
        <div className="flex flex-wrap gap-4 justify-center md:justify-start md:ml-6">
          {/* Total */}
          <div className="bg-blue-100 rounded-xl px-5 py-3 text-center shadow-sm">
            <div className="flex items-center justify-center gap-1 text-sm text-gray-800 font-medium mb-1">
              Total Complaints <ExternalLink size={12} />
            </div>
            <p className="text-xl font-bold text-blue-700">{total}</p>
          </div>

          {/* Resolved */}
          <div className="bg-cyan-100 rounded-xl px-5 py-3 text-center shadow-sm">
            <div className="flex items-center justify-center gap-1 text-sm text-gray-800 font-medium mb-1">
              Resolved <ExternalLink size={12} />
            </div>
            <p className="text-xl font-bold text-cyan-600">{resolved}</p>
          </div>

          {/* Open */}
          <div className="bg-yellow-100 rounded-xl px-5 py-3 text-center shadow-sm">
            <div className="flex items-center justify-center gap-1 text-sm text-gray-800 font-medium mb-1">
              Open <ExternalLink size={12} />
            </div>
            <p className="text-xl font-bold text-yellow-500">{open}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintsCard;
