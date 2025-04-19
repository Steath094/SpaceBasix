package com.hostel.hostelmanagement.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "rooms")
public class Room {
    @Id
    private String id;

    private String roomNumber;
    private int capacity;
    private int occupied;
    private String description;

    private String hostelId; // You can update this to @DBRef if hostel is a model

    @DBRef
    private List<Student> occupancyList;  // List of students assigned to this room

    private RoomCleanlinessStatus cleanlinessStatus; // CLEAN, DIRTY
    private int inspectionCount; // Number of times inspected

    // Enum for cleanliness
    public enum RoomCleanlinessStatus {
        CLEAN, DIRTY
    }

    // Constructors
    public Room() {}

    public Room(String id, String roomNumber, int capacity, int occupied, String description,
                String hostelId, List<Student> occupancyList, RoomCleanlinessStatus cleanlinessStatus,
                int inspectionCount) {
        this.id = id;
        this.roomNumber = roomNumber;
        this.capacity = capacity;
        this.occupied = occupied;
        this.description = description;
        this.hostelId = hostelId;
        this.occupancyList = occupancyList;
        this.cleanlinessStatus = cleanlinessStatus;
        this.inspectionCount = inspectionCount;
    }

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public int getOccupied() {
        return occupied;
    }

    public void setOccupied(int occupied) {
        this.occupied = occupied;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getHostelId() {
        return hostelId;
    }

    public void setHostelId(String hostelId) {
        this.hostelId = hostelId;
    }

    public List<Student> getOccupancyList() {
        return occupancyList;
    }

    public void setOccupancyList(List<Student> occupancyList) {
        this.occupancyList = occupancyList;
    }

    public RoomCleanlinessStatus getCleanlinessStatus() {
        return cleanlinessStatus;
    }

    public void setCleanlinessStatus(RoomCleanlinessStatus cleanlinessStatus) {
        this.cleanlinessStatus = cleanlinessStatus;
    }

    public int getInspectionCount() {
        return inspectionCount;
    }

    public void setInspectionCount(int inspectionCount) {
        this.inspectionCount = inspectionCount;
    }
}
