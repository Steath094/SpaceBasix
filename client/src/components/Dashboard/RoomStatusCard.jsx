import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { roomListAtom } from '../../store/Room';

const RoomStatusCard = () => {
  const roomListLoadable = useRecoilValueLoadable(roomListAtom);

  function getRoomStatusFromRoomList(roomList) {
    const roomStatus = {
      occupiedRooms: {
        count: 0,
        clean: 0,
        dirty: 0,
        inspected: 0,
      },
      available: {
        count: 0,
        clean: 0,
        dirty: 0,
        inspected: 0,
      },
    };

    roomList.forEach((room) => {
      const isOccupied = room.occupied > 0;

      const target = isOccupied ? roomStatus.occupiedRooms : roomStatus.available;
      target.count++;
      if (room.cleanlinessStatus === 'CLEAN') {
        target.clean++;
      } else {
        target.dirty++;
      }
      if (room.inspectionCount > 0) {
        target.inspected++;
      }
    });

    return roomStatus;
  }

  if (roomListLoadable.state === 'loading') {
    return (
      <div className="rounded-xl p-6 bg-white w-full md:w-3/4 shadow-md animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-32 mb-6"></div>
        <div className="space-y-4">
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (roomListLoadable.state === 'hasError') {
    return (
      <div className="rounded-xl p-6 bg-white w-full md:w-3/4 shadow-md text-red-500">
        Error loading room status.
      </div>
    );
  }

  const roomList = roomListLoadable.contents;
  const roomStatus = getRoomStatusFromRoomList(roomList);

  return (
    <div className="rounded-xl p-6 bg-white w-full md:w-3/4 shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Room status</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
        {/* Occupied Rooms */}
        <div>
          <div className="flex justify-between items-center font-medium text-gray-800 mb-4">
            <span>Occupied rooms</span>
            <span>{roomStatus.occupiedRooms.count}</span>
          </div>
          {['clean', 'dirty', 'inspected'].map((key) => (
            <div
              key={key}
              className="flex justify-between text-sm text-gray-600 py-1"
            >
              <span className="capitalize">{key}</span>
              <span className="text-gray-800">
                {roomStatus.occupiedRooms[key]}
              </span>
            </div>
          ))}
        </div>

        {/* Available Rooms */}
        <div>
          <div className="flex justify-between items-center font-medium text-gray-800 mb-4">
            <span>Available rooms</span>
            <span>{roomStatus.available.count}</span>
          </div>
          {['clean', 'dirty', 'inspected'].map((key) => (
            <div
              key={key}
              className="flex justify-between text-sm text-gray-600 py-1"
            >
              <span className="capitalize">{key}</span>
              <span className="text-gray-800">
                {roomStatus.available[key]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomStatusCard;
