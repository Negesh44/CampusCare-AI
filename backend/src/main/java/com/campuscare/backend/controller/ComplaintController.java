package com.campuscare.backend.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.campuscare.backend.model.Complaint;
import com.campuscare.backend.model.ComplaintHistory;
import com.campuscare.backend.model.User;
import com.campuscare.backend.repository.ComplaintHistoryRepository;
import com.campuscare.backend.repository.ComplaintRepository;
import com.campuscare.backend.repository.UserRepository;
import com.campuscare.backend.service.ComplaintService;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin("*")
public class ComplaintController {

    private final ComplaintRepository repository;
    private final ComplaintService complaintService;
    private final ComplaintHistoryRepository historyRepository;
    private final UserRepository userRepository;

    public ComplaintController(
            ComplaintRepository repository,
            ComplaintService complaintService,
            ComplaintHistoryRepository historyRepository,
            UserRepository userRepository) {

        this.repository = repository;
        this.complaintService = complaintService;
        this.historyRepository = historyRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Complaint> getAllComplaints() {
        return repository.findAll();
    }

    @GetMapping("/faculty")
    public List<Complaint> getFacultyComplaints(
            @RequestParam String email) {

        return repository
                .findByAssignedFacultyEmail(email);
    }
    @GetMapping("/student/{studentId}")
public List<Complaint> getStudentComplaints(
        @PathVariable Long studentId) {

    return repository.findByStudentId(studentId);
}

    @PostMapping
    public Complaint createComplaint(
            @RequestBody Complaint complaint) {

        String location =
        complaint.getBlockName()
        + " - "
        + complaint.getFloor();

        List<User> facultyList =
                userRepository.findAll();

        for (User user : facultyList) {

            if ("FACULTY".equals(user.getRole())
                    && location.equalsIgnoreCase(
                    user.getAssignedLocation())) {

                complaint.setAssignedFacultyId(
                        user.getId());

                complaint.setAssignedFacultyName(
                        user.getName());

                complaint.setAssignedFacultyEmail(
                        user.getEmail());

                complaint.setAssignedLocation(
                        user.getAssignedLocation());

                complaint.setAssignedTo(
                        user.getName());

                break;
            }
        }

        return complaintService
                .createComplaint(complaint);
    }

    @PutMapping("/{id}/status")
    public Complaint updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        Complaint complaint =
                repository.findById(id)
                        .orElseThrow();

        String oldStatus =
                complaint.getStatus();

        complaint.setStatus(status);

        Complaint updatedComplaint =
                repository.save(complaint);

        ComplaintHistory history =
                new ComplaintHistory();

        history.setComplaintId(id);
        history.setOldStatus(oldStatus);
        history.setNewStatus(status);

        history.setUpdatedBy(
                complaint.getAssignedTo());

        history.setRemarks(
                "Status changed from "
                        + oldStatus
                        + " to "
                        + status);

        history.setUpdatedAt(
                LocalDateTime.now());

        historyRepository.save(history);

        return updatedComplaint;
    }

    @GetMapping("/{id}/history")
    public List<ComplaintHistory> getHistory(
            @PathVariable Long id) {

        return historyRepository
                .findByComplaintId(id);
    }
}