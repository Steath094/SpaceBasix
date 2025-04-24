import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { backendUrl } from '../config';

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/room/${id}`);
        const data = await response.json();
        setRoom(data.data);
      } catch (error) {
        console.error('Failed to fetch room data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  return (
    <div className="min-h-screen bg-[#f1f5ff] text-gray-800 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto bg-white p-4 sm:p-6 rounded-2xl shadow-md">
        <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-4 sm:mb-6">Room Information</h2>

        {/* Room details */}
        {loading ? (
          <Skeleton height={30} count={6} className="mb-4" />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div><strong>Room Number:</strong> {room.roomNumber}</div>
              <div><strong>Capacity:</strong> {room.capacity}</div>
              <div><strong>Occupied:</strong> {room.occupied}</div>
              <div><strong>Hostel ID:</strong> {room.hostelId}</div>
              <div><strong>Cleanliness Status:</strong> {room.cleanlinessStatus}</div>
              <div><strong>Inspection Count:</strong> {room.inspectionCount}</div>
            </div>
            <div className="mb-4">
              <strong>Description:</strong>
              <p className="mt-1 text-gray-600">{room.description}</p>
            </div>

            {/* Occupancy List */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-blue-600 mb-2">Occupants</h3>
              {room.occupancyList?.length > 0 ? (
                <div className="space-y-3">
                  {room.occupancyList.map((student, index) => (
                    <div
                      key={index}
                      className="p-4 bg-blue-50 rounded-lg shadow flex flex-col sm:flex-row justify-between sm:items-center gap-2"
                    >
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-gray-600">Reg No: {student.registrationNumber}</p>
                        <p className="text-sm text-gray-600">Email: {student.email}</p>
                      </div>
                      <div className="text-sm text-gray-700">
                        Fee Status:{' '}
                        <span className={student.feeStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'}>
                          {student.feeStatus}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No occupants currently.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RoomDetails;
