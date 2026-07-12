package com.campuscare.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.campuscare.backend.model.ComplaintHistory;

public interface ComplaintHistoryRepository
        extends JpaRepository<ComplaintHistory, Long> {

    List<ComplaintHistory> findByComplaintId(Long complaintId);
}