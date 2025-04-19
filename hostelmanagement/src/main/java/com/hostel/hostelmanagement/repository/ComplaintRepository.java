package com.hostel.hostelmanagement.repository;

import com.hostel.hostelmanagement.model.Complaint;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComplaintRepository extends MongoRepository<Complaint, String> {

    // Find complaints by student registration number
    List<Complaint> findByStudentRegNo(String studentRegNo);

    // Find complaints by status
    List<Complaint> findByStatus(Complaint.ComplaintStatus status);

    // Find complaints by room number
    List<Complaint> findByRoomNumber(String roomNumber);

    // Find complaints by hostel ID
    List<Complaint> findByHostelId(String hostelId);
}
