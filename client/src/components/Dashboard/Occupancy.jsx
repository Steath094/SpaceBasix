import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ExternalLink } from 'lucide-react';
import { roomListAtom } from '../../store/Room';
import { useRecoilValueLoadable } from 'recoil';

const COLORS = ['#00FFFF', '#2c2c2c'];

const OccupancyCard = () => {
  const roomListLoadable = useRecoilValueLoadable(roomListAtom);

  function getRoomOccupancyChartData(roomList) {
    let occupiedCount = 0;
    let emptyCount = 0;

    roomList.forEach(room => {
      if (room.occupied > 0) {
        occupiedCount++;
      } else {
        emptyCount++;
      }
    });

    return [
      { name: 'Occupied', value: occupiedCount },
      { name: 'Empty', value: emptyCount }
    ];
  }

  if (roomListLoadable.state === 'loading') {
    return (
      <div className="bg-white text-black p-4 sm:p-6 rounded-2xl shadow-md animate-pulse w-full">
        <div className="h-6 w-32 bg-gray-300 rounded mb-4"></div>
        <div className="h-[200px] w-full bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (roomListLoadable.state === 'hasError') {
    return (
      <div className="bg-white text-red-500 p-6 rounded-2xl shadow-md w-full">
        <p>Error loading occupancy data.</p>
      </div>
    );
  }

  const roomList = roomListLoadable.contents;
  const data = getRoomOccupancyChartData(roomList);
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const occupied = data.find(d => d.name === 'Occupied')?.value || 0;
  const percent = total > 0 ? Math.round((occupied / total) * 100) : 0;

  return (
    <div className="bg-white text-black p-4 sm:p-6 rounded-2xl shadow-md w-full max-w-md mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg sm:text-xl font-semibold">Occupancy</h2>
        <ExternalLink size={16} className="text-gray-500" />
      </div>

      <div className="relative w-full aspect-square max-w-[250px] mx-auto flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius="70%"
              outerRadius="90%"
              startAngle={180}
              endAngle={-180}
              paddingAngle={0}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute text-xl sm:text-2xl font-bold text-black">
          {percent}%
        </div>
      </div>
    </div>
  );
};

export default OccupancyCard;
