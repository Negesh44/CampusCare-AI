package com.campuscare.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.campuscare.backend.model.Complaint;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

    long countByStatus(String status);

}