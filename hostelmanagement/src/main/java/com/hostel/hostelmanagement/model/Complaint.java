package com.hostel.hostelmanagement.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "complaints")
public class Complaint {

    @Id
    private String id;
    private String studentRegNo;
    private String studentId;
    private String message;
    private ComplaintStatus status = ComplaintStatus.PENDING;
    private LocalDate date;
    private String roomNumber;
    private String hostelId; // ✅ Added field for hostel ID

    // Enum for Complaint status
    public enum ComplaintStatus {
        PENDING,
        RESOLVED,
        IN_PROGRESS
    }

    // Default constructor
    public Complaint() {
    }

    // Constructor with all fields
    public Complaint(String id, String studentRegNo, String studentId, String message,
                     ComplaintStatus status, LocalDate date, String roomNumber, String hostelId) {
        this.id = id;
        this.studentRegNo = studentRegNo;
        this.studentId = studentId;
        this.message = message;
        this.status = status;
        this.date = date;
        this.roomNumber = roomNumber;
        this.hostelId = hostelId; // ✅ Set hostel ID
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStudentRegNo() {
        return studentRegNo;
    }

    public void setStudentRegNo(String studentRegNo) {
        this.studentRegNo = studentRegNo;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public ComplaintStatus getStatus() {
        return status;
    }

    public void setStatus(ComplaintStatus status) {
        this.status = status;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public String getHostelId() {
        return hostelId;
    }

    public void setHostelId(String hostelId) {
        this.hostelId = hostelId;
    }
}
