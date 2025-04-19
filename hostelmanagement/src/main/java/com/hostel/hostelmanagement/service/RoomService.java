package com.hostel.hostelmanagement.service;

import com.hostel.hostelmanagement.model.Room;
import com.hostel.hostelmanagement.model.Student;
import com.hostel.hostelmanagement.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    public Room addRoom(Room room) {
        return roomRepository.save(room);
    }
    public List<Room> getRoomsByHostel(String hostelId) {
        return roomRepository.findByHostelId(hostelId);
    }
    public Optional<Room> getRoomById(String id) {
        return roomRepository.findById(id);
    }

    public void deleteRoom(String id) {
        roomRepository.deleteById(id);
    }

    public Room updateRoom(Room room) {
        return roomRepository.save(room);
    }

    // 🔄 Get Room by Student ID (checks occupancy list)
    public Optional<Room> getRoomByStudentId(String studentId) {
        List<Room> allRooms = roomRepository.findAll();

        for (Room room : allRooms) {
            List<Student> occupancy = room.getOccupancyList();
            if (occupancy != null) {
                for (Student student : occupancy) {
                    if (student.getId().equals(studentId)) {
                        return Optional.of(room);
                    }
                }
            }
        }

        return Optional.empty();
    }
}
