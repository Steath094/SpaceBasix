package com.hostel.hostelmanagement.service;

import com.hostel.hostelmanagement.model.Complaint;
import com.hostel.hostelmanagement.repository.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ComplaintService {

    private final ComplaintRepository complaintRepository;

    @Autowired
    public ComplaintService(ComplaintRepository complaintRepository) {
        this.complaintRepository = complaintRepository;
    }

    // Save a complaint
    public Complaint saveComplaint(Complaint complaint) {
        return complaintRepository.save(complaint);
    }

    // Get a complaint by ID
    public Optional<Complaint> getComplaintById(String id) {
        return complaintRepository.findById(id);
    }

    // Get all complaints
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    // Get complaints by student registration number
    public List<Complaint> getComplaintsByStudentRegNo(String studentRegNo) {
        return complaintRepository.findByStudentRegNo(studentRegNo);
    }

    // Get complaints by status
    public List<Complaint> getComplaintsByStatus(Complaint.ComplaintStatus status) {
        return complaintRepository.findByStatus(status);
    }

    // Get complaints by room number
    public List<Complaint> getComplaintsByRoomNumber(String roomNumber) {
        return complaintRepository.findByRoomNumber(roomNumber);
    }

    // Get complaints by hostel ID
    public List<Complaint> getComplaintsByHostelId(String hostelId) {
        return complaintRepository.findByHostelId(hostelId);
    }

    // Update the status of a complaint
    public Complaint updateComplaintStatus(String id, Complaint.ComplaintStatus status) {
        Optional<Complaint> complaintOptional = complaintRepository.findById(id);
        if (complaintOptional.isPresent()) {
            Complaint complaint = complaintOptional.get();
            complaint.setStatus(status);
            return complaintRepository.save(complaint);
        }
        return null;
    }

    // Delete a complaint
    public void deleteComplaint(String id) {
        complaintRepository.deleteById(id);
    }
}
