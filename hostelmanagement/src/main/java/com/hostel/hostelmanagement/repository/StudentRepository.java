package com.hostel.hostelmanagement.repository;

import com.hostel.hostelmanagement.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends MongoRepository<Student, String> {
    Optional<Student> findByRegistrationNumberAndPassword(String registrationNumber, String password);
    Optional<Student> findByRegistrationNumber(String registrationNumber);
    List<Student> findByHostelId(String hostelId);
}
