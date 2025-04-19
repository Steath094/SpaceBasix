package com.hostel.hostelmanagement.controller;

import com.hostel.hostelmanagement.model.Student;
import com.hostel.hostelmanagement.payload.ApiResponse;
import com.hostel.hostelmanagement.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/student")
@CrossOrigin
public class StudentController {

    @Autowired
    private StudentService studentService;

    // Register a new student
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Student>> registerStudent(@RequestBody Student student) {
        Optional<Student> existingStudent = studentService.getByRegNumber(student.getRegistrationNumber());

        if (existingStudent.isPresent()) {
            return ResponseEntity.status(409).body(
                    new ApiResponse<>(409, "Student with this registration number already exists", null)
            );
        }

        Student savedStudent = studentService.registerStudent(student);
        return ResponseEntity.ok(new ApiResponse<>(200, "Student registered successfully", savedStudent));
    }

    // Student login
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<Student>> login(@RequestBody Student loginDetails) {
        Optional<Student> student = studentService.login(loginDetails.getRegistrationNumber(), loginDetails.getPassword());

        if (student.isPresent()) {
            return ResponseEntity.ok(new ApiResponse<>(200, "Login successful", student.get()));
        } else {
            return ResponseEntity.status(401).body(
                    new ApiResponse<>(401, "Invalid registration number or password", null)
            );
        }
    }

    // Get student profile by registration number
    @GetMapping("/{regNo}")
    public ResponseEntity<ApiResponse<Student>> getStudentByRegNo(@PathVariable String regNo) {
        Optional<Student> student = studentService.getByRegNumber(regNo);

        if (student.isPresent()) {
            return ResponseEntity.ok(new ApiResponse<>(200, "Student found", student.get()));
        } else {
            return ResponseEntity.status(404).body(
                    new ApiResponse<>(404, "Student not found", null)
            );
        }
    }

    // Update student details
    @PutMapping("/update")
    public ResponseEntity<ApiResponse<Student>> updateStudent(@RequestBody Student student) {
        Optional<Student> existingStudent = studentService.getByRegNumber(student.getRegistrationNumber());

        if (existingStudent.isEmpty()) {
            return ResponseEntity.status(404).body(new ApiResponse<>(404, "Student not found", null));
        }

        Student updatedStudent = studentService.updateStudent(student);
        return ResponseEntity.ok(new ApiResponse<>(200, "Student updated successfully", updatedStudent));
    }

    // Get all students in a hostel
    @GetMapping("/hostel/{hostelId}")
    public ResponseEntity<ApiResponse<List<Student>>> getStudentsByHostel(@PathVariable String hostelId) {
        List<Student> students = studentService.getStudentsByHostel(hostelId);

        return ResponseEntity.ok(new ApiResponse<>(200, "Students fetched successfully", students));
    }
}
