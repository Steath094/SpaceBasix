package com.hostel.hostelmanagement.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "students")
public class Student {
    @Id
    private String id;
    private String name;
    @Indexed(unique = true)
    private String registrationNumber;
    private String password;
    private String roomId;

    // Optional fields
    private String feeStatus; // e.g. "Paid" / "Unpaid"
    private String email;     // in case you want to display it on UI
    private String hostelId;

    // Getters and Setters

    public Student(String id, String name, String registrationNumber, String password, String roomId, String feeStatus, String email) {
        this.id = id;
        this.name = name;

        this.registrationNumber = registrationNumber;
        this.password = password;
        this.roomId = roomId;
        this.feeStatus = feeStatus;
        this.email = email;
    }
    public String getHostelId() {
        return hostelId;
    }

    public void setHostelId(String hostelId) {
        this.hostelId = hostelId;
    }
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }

    public String getFeeStatus() {
        return feeStatus;
    }

    public void setFeeStatus(String feeStatus) {
        this.feeStatus = feeStatus;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
