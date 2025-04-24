import React, { useRef, useState, useEffect } from 'react';
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import axios from 'axios';
import { profileAtom } from '../store/profileAtom';
import { refreshAtom, studentListAtom } from '../store/student';
import { backendUrl } from '../config';
export default function AddRoom() {
  const setRefresh = useSetRecoilState(refreshAtom);
  useEffect(() => {
    setRefresh(prev => prev + 1);
          }, []);
  const roomNumberRef = useRef();
  const capacityRef = useRef();
  const occupiedRef = useRef();
  const descriptionRef = useRef();
  const cleanlinessStatusRef = useRef();
  const inspectionCountRef = useRef();

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [successInfo, setSuccessInfo] = useState(null);
  const [formErrors, setFormErrors] = useState({
    roomNumber: '',
    capacity: '',
    occupied: '',
    description: '',
    cleanlinessStatus: '',
    inspectionCount: '',
  });

  const profile = useRecoilValueLoadable(profileAtom);
  const studentLoadable = useRecoilValueLoadable(studentListAtom);

  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    if (studentLoadable.state === 'hasValue' && profile.state === 'hasValue') {
      const hostelStudents = studentLoadable.contents.filter(
        (student) => student.hostelId === profile.contents.id
      );
      setFilteredStudents(hostelStudents);
    }
  }, [studentLoadable, profile]);

  const toggleStudentSelection = (student) => {
    setSelectedStudents((prev) => {
      const exists = prev.find((s) => s.id === student.id);
      return exists ? prev.filter((s) => s.id !== student.id) : [...prev, student];
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setFormErrors({
      roomNumber: '',
      capacity: '',
      occupied: '',
      description: '',
      cleanlinessStatus: '',
      inspectionCount: '',
    });

    let isValid = true;
    const errors = {};

    // Validate each field
    if (!roomNumberRef.current.value.trim()) {
      errors.roomNumber = 'Room Number is required';
      isValid = false;
    }
    if (!capacityRef.current.value || capacityRef.current.value <= 0) {
      errors.capacity = 'Capacity is required and must be a positive number';
      isValid = false;
    }
    if (!occupiedRef.current.value || occupiedRef.current.value < 0) {
      errors.occupied = 'Occupied number is required and must be zero or a positive number';
      isValid = false;
    }
    if (!descriptionRef.current.value.trim()) {
      errors.description = 'Description is required';
      isValid = false;
    }
    if (!cleanlinessStatusRef.current.value) {
      errors.cleanlinessStatus = 'Cleanliness Status is required';
      isValid = false;
    }
    if (!inspectionCountRef.current.value || inspectionCountRef.current.value < 0) {
      errors.inspectionCount = 'Inspection Count is required and must be zero or a positive number';
      isValid = false;
    }

    if (!isValid) {
      setFormErrors(errors);
      return;
    }

    const payload = {
      roomNumber: roomNumberRef.current.value,
      capacity: parseInt(capacityRef.current.value),
      occupied: parseInt(occupiedRef.current.value),
      description: descriptionRef.current.value,
      hostelId: profile.contents.id,
      cleanlinessStatus: cleanlinessStatusRef.current.value,
      inspectionCount: parseInt(inspectionCountRef.current.value),
      occupancyList: selectedStudents,
    };

    try {
      const res = await axios.post(`${backendUrl}/api/room/add`, payload);
      setRefresh(prev => prev + 1);
      setSuccessInfo(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f5ff] p-6 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">Add Room</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {/* Room Number */}
          <input
            ref={roomNumberRef}
            type="text"
            placeholder="Room Number"
            className={`p-2 border rounded ${formErrors.roomNumber ? 'border-red-500' : ''}`}
          />
          {formErrors.roomNumber && <p className="text-red-500 text-sm">{formErrors.roomNumber}</p>}

          {/* Capacity */}
          <input
            ref={capacityRef}
            type="number"
            placeholder="Capacity"
            className={`p-2 border rounded ${formErrors.capacity ? 'border-red-500' : ''}`}
          />
          {formErrors.capacity && <p className="text-red-500 text-sm">{formErrors.capacity}</p>}

          {/* Occupied */}
          <input
            ref={occupiedRef}
            type="number"
            placeholder="Occupied"
            className={`p-2 border rounded ${formErrors.occupied ? 'border-red-500' : ''}`}
          />
          {formErrors.occupied && <p className="text-red-500 text-sm">{formErrors.occupied}</p>}

          {/* Description */}
          <input
            ref={descriptionRef}
            type="text"
            placeholder="Description"
            className={`p-2 border rounded ${formErrors.description ? 'border-red-500' : ''}`}
          />
          {formErrors.description && <p className="text-red-500 text-sm">{formErrors.description}</p>}

          {/* Cleanliness Status */}
          <select
            ref={cleanlinessStatusRef}
            className={`p-2 border rounded ${formErrors.cleanlinessStatus ? 'border-red-500' : ''}`}
          >
            <option value="">Select Cleanliness Status</option>
            <option value="CLEAN">CLEAN</option>
            <option value="DIRTY">DIRTY</option>
          </select>
          {formErrors.cleanlinessStatus && <p className="text-red-500 text-sm">{formErrors.cleanlinessStatus}</p>}

          {/* Inspection Count */}
          <input
            ref={inspectionCountRef}
            type="number"
            placeholder="Inspection Count"
            className={`p-2 border rounded ${formErrors.inspectionCount ? 'border-red-500' : ''}`}
          />
          {formErrors.inspectionCount && <p className="text-red-500 text-sm">{formErrors.inspectionCount}</p>}

          {/* Select Students */}
          <div className="col-span-2">
            <h3 className="font-semibold mb-2">Select Students</h3>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  onClick={() => toggleStudentSelection(student)}
                  className={`cursor-pointer p-3 rounded border ${selectedStudents.some((s) => s.id === student.id) ? 'bg-blue-100 border-blue-400' : 'bg-gray-50'}`}
                >
                  <p className="font-medium">{student.name}</p>
                  <p className="text-sm text-gray-500">Reg No: {student.registrationNumber}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Add Room
          </button>
        </form>

        {/* Success Message */}
        {successInfo && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
            Room <span className="font-bold">{successInfo.roomNumber}</span> added successfully!
          </div>
        )}
      </div>
    </div>
  );
}
