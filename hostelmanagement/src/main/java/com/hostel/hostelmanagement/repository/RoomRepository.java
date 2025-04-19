package com.hostel.hostelmanagement.repository;

import com.hostel.hostelmanagement.model.Room;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RoomRepository extends MongoRepository<Room, String> {
    List<Room> findByHostelId(String hostelId);
}
