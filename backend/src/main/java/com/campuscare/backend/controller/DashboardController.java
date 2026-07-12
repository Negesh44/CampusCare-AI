package com.campuscare.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.campuscare.backend.model.Complaint;
import com.campuscare.backend.repository.ComplaintRepository;

@RestController
@CrossOrigin("*")
public class DashboardController {

    private final ComplaintRepository complaintRepository;

    public DashboardController(
            ComplaintRepository complaintRepository) {

        this.complaintRepository = complaintRepository;
    }

    @GetMapping("/api/dashboard/stats")
    public Map<String, Object> getStats() {

        Map<String, Object> stats = new HashMap<>();

        stats.put(
                "totalComplaints",
                complaintRepository.count());

        stats.put(
                "openComplaints",
                complaintRepository.countByStatus("OPEN"));

        stats.put(
                "inProgressComplaints",
                complaintRepository.countByStatus("IN_PROGRESS"));

        stats.put(
                "resolvedComplaints",
                complaintRepository.countByStatus("RESOLVED"));

        return stats;
    }

    @GetMapping("/api/dashboard/category-stats")
    public Map<String, Long> getCategoryStats() {

        List<Complaint> complaints =
                complaintRepository.findAll();

        Map<String, Long> stats =
                new HashMap<>();

        for (Complaint complaint : complaints) {

            stats.put(
                    complaint.getCategory(),
                    stats.getOrDefault(
                            complaint.getCategory(),
                            0L)
                            + 1);
        }

        return stats;
    }

    @GetMapping("/api/dashboard/floor-stats")
    public Map<Integer, Long> getFloorStats() {

        List<Complaint> complaints =
                complaintRepository.findAll();

        Map<Integer, Long> stats =
                new HashMap<>();

        for (Complaint complaint : complaints) {

            stats.put(
                    complaint.getFloor(),
                    stats.getOrDefault(
                            complaint.getFloor(),
                            0L)
                            + 1);
        }

        return stats;
    }

    @GetMapping("/api/dashboard/incharge-stats")
    public Map<String, Long> getInchargeStats() {

        List<Complaint> complaints =
                complaintRepository.findAll();

        Map<String, Long> stats =
                new HashMap<>();

        for (Complaint complaint : complaints) {

            if (complaint.getAssignedTo() != null) {

                stats.put(
                        complaint.getAssignedTo(),
                        stats.getOrDefault(
                                complaint.getAssignedTo(),
                                0L)
                                + 1);
            }
        }

        return stats;
    }
}