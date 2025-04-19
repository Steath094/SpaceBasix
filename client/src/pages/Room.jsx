import React, { useEffect, useState } from 'react';
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { roomListAtom } from '../store/Room';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { refreshAtom } from '../store/student';

const statusColors = {
  Available: 'text-blue-600 bg-blue-100',
  Occupied: 'text-red-600 bg-red-100',
  Reserved: 'text-green-600 bg-green-100',
  Waitlist: 'text-yellow-600 bg-yellow-100',
  Blocked: 'text-gray-600 bg-gray-200',
};

export default function Room() {
  const setRefresh = useSetRecoilState(refreshAtom);
  useEffect(() => {
    setRefresh((prev) => prev + 1);
  }, []);

  const roomListLoadable = useRecoilValueLoadable(roomListAtom);
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  function transformRoomListToRooms(roomList) {
    return roomList.map((room) => ({
      id: room.id,
      number: `#${room.roomNumber}`,
      type: room.capacity === 1 ? 'Single bed' : 'Double bed',
      capacity: room.capacity,
      occupied: room.occupied,
      facility: room.description,
      status: room.occupied >= room.capacity ? 'Occupied' : 'Available',
    }));
  }

  if (roomListLoadable.state === 'loading') {
    return (
      <div className="m-4 md:m-6 border h-screen border-gray-200 rounded-xl p-4 bg-white shadow-md">
        <Loader />
        <div className="animate-pulse space-y-4 mt-6">
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="h-6 bg-gray-200 rounded w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  if (roomListLoadable.state === 'hasError') {
    return (
      <div className="m-4 md:m-6 border h-screen border-gray-200 rounded-xl p-4 bg-white shadow-md flex items-center justify-center text-red-600">
        Error loading room list. Please try again later.
      </div>
    );
  }

  const roomList = roomListLoadable.contents;
  const rooms = transformRoomListToRooms(roomList);

  const filteredRooms = rooms.filter((room) => {
    if (filter === 'Available') return room.status === 'Available';
    if (filter === 'Occupied') return room.status === 'Occupied';
    return true;
  });

  return (
    <div className="m-4 md:m-6 border border-gray-200 rounded-xl p-4 md:p-6 bg-white shadow-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">Room</h2>
        <button
          onClick={() => navigate('/add-room')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm md:text-base"
        >
          Add room
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 md:gap-4 mb-4">
        {['All', 'Available', 'Occupied'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`${
              filter === type ? 'text-blue-600 bg-blue-100' : 'text-gray-600'
            } font-medium border px-3 py-1 rounded-full text-sm transition`}
          >
            {type} (
              {type === 'All'
                ? rooms.length
                : rooms.filter((r) => r.status === type).length}
            )
          </button>
        ))}
      </div>

      {/* Room List or No Rooms Message */}
      {filteredRooms.length === 0 ? (
        <div className="p-6 text-gray-600">
          No {filter.toLowerCase()} rooms available.
        </div>
      ) : (
        <div className="overflow-auto max-h-[65vh] border-t border-gray-200">
          <table className="min-w-[700px] w-full text-left text-sm">
            <thead className="sticky top-0 bg-white z-10">
              <tr className="text-gray-500 border-b">
                <th className="p-2">Room number</th>
                <th className="p-2">Bed type</th>
                <th className="p-2">Capacity</th>
                <th className="p-2">Occupied</th>
                <th className="p-2">Room facility</th>
                <th className="p-2">Status</th>
                <th className="p-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms.map((room) => (
                <tr
                  key={room.id}
                  onClick={() => navigate(`/room/${room.id}`)}
                  className="border-b hover:bg-gray-50 transition cursor-pointer"
                >
                  <td className="p-2 font-medium text-gray-800">{room.number}</td>
                  <td className="p-2">{room.type}</td>
                  <td className="p-2">{room.capacity}</td>
                  <td className="p-2">{room.occupied}</td>
                  <td className="p-2">{room.facility}</td>
                  <td className="p-2">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColors[room.status]}`}
                    >
                      {room.status}
                    </span>
                  </td>
                  <td className="p-2 text-right text-gray-400">
                    <Link to={`/room/${room.id}`} className="text-blue-600 hover:text-blue-700">
                      ⋮
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
