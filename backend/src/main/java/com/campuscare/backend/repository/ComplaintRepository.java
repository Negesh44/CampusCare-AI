package com.campuscare.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.campuscare.backend.model.Complaint;

public interface ComplaintRepository
        extends JpaRepository<Complaint, Long> {

    long countByStatus(String status);

    List<Complaint> findByAssignedFacultyEmail(
            String assignedFacultyEmail);

    List<Complaint> findByAssignedLocation(
            String assignedLocation);

    List<Complaint> findByStatus(
            String status);
}  