package com.hostel.hostelmanagement.service;

import com.hostel.hostelmanagement.model.Student;
import com.hostel.hostelmanagement.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public Student registerStudent(Student student) {
        return studentRepository.save(student);
    }

    public Optional<Student> login(String registrationNumber, String password) {
        return studentRepository.findByRegistrationNumberAndPassword(registrationNumber, password);
    }

    public Optional<Student> getByRegNumber(String regNo) {
        return studentRepository.findByRegistrationNumber(regNo);
    }

    public Student updateStudent(Student student) {
        Optional<Student> existingStudentOpt = studentRepository.findByRegistrationNumber(student.getRegistrationNumber());

        if (existingStudentOpt.isEmpty()) {
            throw new RuntimeException("Student not found");
        }

        Student existingStudent = existingStudentOpt.get();

        // Update only the fields you want
        existingStudent.setName(student.getName());
        existingStudent.setEmail(student.getEmail());
        existingStudent.setFeeStatus(student.getFeeStatus());
        existingStudent.setHostelId(student.getHostelId());
        existingStudent.setRoomId(student.getRoomId());
        // Add more fields as needed

        return studentRepository.save(existingStudent);
    }


    // Get all students belonging to a hostel
    public List<Student> getStudentsByHostel(String hostelId) {
        return studentRepository.findByHostelId(hostelId);
    }
}