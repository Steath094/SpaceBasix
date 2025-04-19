package com.hostel.hostelmanagement.controller;

import com.hostel.hostelmanagement.model.Admin;
import com.hostel.hostelmanagement.payload.ApiResponse;
import com.hostel.hostelmanagement.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private AdminService adminService;

    // Register new admin
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Admin>> registerAdmin(@RequestBody Admin admin) {
        Optional<Admin> exists = adminService.getAdminByEmail(admin.getEmail());

        if (exists.isPresent()) {
            return ResponseEntity.status(409).body(
                    new ApiResponse<>(409, "Admin with this email already exists", null)
            );
        }

        Admin savedAdmin = adminService.registerAdmin(admin);
        return ResponseEntity.ok(new ApiResponse<>(200, "Admin registered successfully", savedAdmin));
    }

    // Admin login
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<Admin>> login(@RequestBody Admin loginDetails) {
        Optional<Admin> admin = adminService.login(loginDetails.getEmail(), loginDetails.getPassword());

        if (admin.isPresent()) {
            return ResponseEntity.ok(new ApiResponse<>(200, "Login successful", admin.get()));
        } else {
            return ResponseEntity.ok(new ApiResponse<>(401, "Invalid credentials", null));
        }
    }

    // Get dashboard data (e.g., admin profile)
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Admin>> getAdminById(@PathVariable String id) {
        Optional<Admin> admin = adminService.getAdminById(id);

        if (admin.isPresent()) {
            return ResponseEntity.ok(new ApiResponse<>(200, "Admin found", admin.get()));
        } else {
            return ResponseEntity.status(404).body(
                    new ApiResponse<>(404, "Admin not found", null)
            );
        }
    }
}
