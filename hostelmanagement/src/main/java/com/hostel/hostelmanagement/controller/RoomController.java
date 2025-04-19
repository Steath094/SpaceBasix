package com.hostel.hostelmanagement.controller;

import com.hostel.hostelmanagement.model.Room;
import com.hostel.hostelmanagement.payload.ApiResponse;
import com.hostel.hostelmanagement.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/room")
@CrossOrigin
public class RoomController {

    @Autowired
    private RoomService roomService;

    // Add a new room
    @PostMapping("/add")
    public ResponseEntity<ApiResponse<Room>> addRoom(@RequestBody Room room) {
        Room savedRoom = roomService.addRoom(room);
        return ResponseEntity.ok(new ApiResponse<>(200, "Room added successfully", savedRoom));
    }
// Get all rooms for a specific hostel
    @GetMapping("/hostel/{hostelId}")
    public ResponseEntity<ApiResponse<List<Room>>> getRoomsByHostel(@PathVariable String hostelId) {
        List<Room> rooms = roomService.getRoomsByHostel(hostelId);
        return ResponseEntity.ok(new ApiResponse<>(200, "Rooms fetched successfully", rooms));
    }
    // ✅ Get a single room by ID
    @GetMapping("/{roomId}")
    public ResponseEntity<ApiResponse<Room>> getRoomById(@PathVariable String roomId) {
        Optional<Room> room = roomService.getRoomById(roomId);
        if (room.isPresent()) {
            return ResponseEntity.ok(new ApiResponse<>(200, "Room found", room.get()));
        } else {
            return ResponseEntity.status(404).body(new ApiResponse<>(404, "Room not found", null));
        }
    }

    // ✅ Get room by student ID (new feature)
    @GetMapping("/student/{studentId}")
    public ResponseEntity<ApiResponse<Room>> getRoomByStudentId(@PathVariable String studentId) {
        Optional<Room> room = roomService.getRoomByStudentId(studentId);
        if (room.isPresent()) {
            return ResponseEntity.ok(new ApiResponse<>(200, "Room found for student", room.get()));
        } else {
            return ResponseEntity.status(404).body(new ApiResponse<>(404, "Room not found for this student", null));
        }
    }

    // Update room details
    @PutMapping("/update")
    public ResponseEntity<ApiResponse<Room>> updateRoom(@RequestBody Room room) {
        Optional<Room> existingRoom = roomService.getRoomById(room.getId());
        if (existingRoom.isEmpty()) {
            return ResponseEntity.status(404).body(new ApiResponse<>(404, "Room not found", null));
        }

        Room updatedRoom = roomService.updateRoom(room);
        return ResponseEntity.ok(new ApiResponse<>(200, "Room updated successfully", updatedRoom));
    }

    // Delete a room
    @DeleteMapping("/delete/{roomId}")
    public ResponseEntity<ApiResponse<String>> deleteRoom(@PathVariable String roomId) {
        Optional<Room> room = roomService.getRoomById(roomId);
        if (room.isEmpty()) {
            return ResponseEntity.status(404).body(new ApiResponse<>(404, "Room not found", null));
        }

        roomService.deleteRoom(roomId);
        return ResponseEntity.ok(new ApiResponse<>(200, "Room deleted successfully", roomId));
    }
}
