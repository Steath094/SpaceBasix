package com.hostel.hostelmanagement.controller;

import com.hostel.hostelmanagement.model.Complaint;
import com.hostel.hostelmanagement.service.ComplaintService;
import com.hostel.hostelmanagement.payload.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin
public class ComplaintController {

    private final ComplaintService complaintService;

    @Autowired
    public ComplaintController(ComplaintService complaintService) {
        this.complaintService = complaintService;
    }

    // Create a new complaint
    @PostMapping("/add")
    public ResponseEntity<ApiResponse<Complaint>> createComplaint(@RequestBody Complaint complaint) {
        Complaint createdComplaint = complaintService.saveComplaint(complaint);
        return ResponseEntity.ok(new ApiResponse<>(201, "Complaint created successfully", createdComplaint));
    }

    // Get all complaints
    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<Complaint>>> getAllComplaints() {
        List<Complaint> complaints = complaintService.getAllComplaints();
        return ResponseEntity.ok(new ApiResponse<>(200, "All complaints retrieved successfully", complaints));
    }

    // Get complaint by ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Complaint>> getComplaintById(@PathVariable String id) {
        Optional<Complaint> complaint = complaintService.getComplaintById(id);
        return complaint
                .map(c -> ResponseEntity.ok(new ApiResponse<>(200, "Complaint found", c)))
                .orElseGet(() -> ResponseEntity.status(404).body(new ApiResponse<>(404, "Complaint not found", null)));
    }

    // Get complaints by student registration number
    @GetMapping("/student/{studentRegNo}")
    public ResponseEntity<ApiResponse<List<Complaint>>> getComplaintsByStudentRegNo(@PathVariable String studentRegNo) {
        List<Complaint> complaints = complaintService.getComplaintsByStudentRegNo(studentRegNo);
        return ResponseEntity.ok(new ApiResponse<>(200, "Complaints for student retrieved", complaints));
    }

    // Get complaints by status
    @GetMapping("/status/{status}")
    public ResponseEntity<ApiResponse<List<Complaint>>> getComplaintsByStatus(@PathVariable Complaint.ComplaintStatus status) {
        List<Complaint> complaints = complaintService.getComplaintsByStatus(status);
        return ResponseEntity.ok(new ApiResponse<>(200, "Complaints with status retrieved", complaints));
    }

    // Get complaints by room number
    @GetMapping("/room/{roomNumber}")
    public ResponseEntity<ApiResponse<List<Complaint>>> getComplaintsByRoomNumber(@PathVariable String roomNumber) {
        List<Complaint> complaints = complaintService.getComplaintsByRoomNumber(roomNumber);
        return ResponseEntity.ok(new ApiResponse<>(200, "Complaints for room retrieved", complaints));
    }

    // ✅ Get complaints by hostel ID
    @GetMapping("/hostel/{hostelId}")
    public ResponseEntity<ApiResponse<List<Complaint>>> getComplaintsByHostelId(@PathVariable String hostelId) {
        List<Complaint> complaints = complaintService.getComplaintsByHostelId(hostelId);
        return ResponseEntity.ok(new ApiResponse<>(200, "Complaints for hostel retrieved", complaints));
    }

    // Update the status of a complaint
    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<Complaint>> updateComplaintStatus(@PathVariable String id,
                                                                        @RequestBody ComplaintStatusRequest request) {
        Complaint updatedComplaint = complaintService.updateComplaintStatus(id, request.getStatus());
        if (updatedComplaint != null) {
            return ResponseEntity.ok(new ApiResponse<>(200, "Complaint status updated", updatedComplaint));
        } else {
            return ResponseEntity.status(404).body(new ApiResponse<>(404, "Complaint not found", null));
        }
    }

    // Delete a complaint
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteComplaint(@PathVariable String id) {
        complaintService.deleteComplaint(id);
        return ResponseEntity.ok(new ApiResponse<>(200, "Complaint deleted successfully", null));
    }

    // Inner static class for status request
    static class ComplaintStatusRequest {
        private Complaint.ComplaintStatus status;

        public Complaint.ComplaintStatus getStatus() {
            return status;
        }

        public void setStatus(Complaint.ComplaintStatus status) {
            this.status = status;
        }
    }
}
