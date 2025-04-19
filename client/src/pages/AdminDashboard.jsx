import React, { Suspense, useEffect } from 'react';
import OverView from '../components/Dashboard/OverView';
import RoomStatusCard from '../components/Dashboard/RoomStatusCard';
import OccupancyCard from '../components/Dashboard/Occupancy';
import ComplaintsCard from '../components/Dashboard/ComplaintCard';
import StudentUpdateCard from '../components/Dashboard/StudentUpdateCard';
import { Loader } from 'lucide-react';
import { useSetRecoilState } from 'recoil';
import { refreshAtom } from '../store/student';

function AdminDashboard() {
  const setRefresh = useSetRecoilState(refreshAtom);

  useEffect(() => {
    setRefresh(prev => prev + 1);
  }, []);

  return (
    <Suspense fallback={<Loader className="m-4 animate-spin" />}>
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 bg-[#FAF9F6] p-4 md:p-6 lg:p-10">
        {/* Left Section */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <OverView />
          <div className="flex flex-col md:flex-row gap-4">
            <RoomStatusCard />
            <OccupancyCard />
          </div>
          <ComplaintsCard />
        </div>

        {/* Right Section */}
        <div className="lg:col-span-2">
          <StudentUpdateCard />
        </div>
      </div>
    </Suspense>
  );
}

export default AdminDashboard;
