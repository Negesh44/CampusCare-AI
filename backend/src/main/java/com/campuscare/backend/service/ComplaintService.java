package com.campuscare.backend.service;

import org.springframework.stereotype.Service;

import com.campuscare.backend.model.Complaint;
import com.campuscare.backend.model.FloorIncharge;
import com.campuscare.backend.repository.ComplaintRepository;
import com.campuscare.backend.repository.FloorInchargeRepository;

@Service
public class ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final FloorInchargeRepository floorInchargeRepository;

    public ComplaintService(
            ComplaintRepository complaintRepository,
            FloorInchargeRepository floorInchargeRepository) {

        this.complaintRepository = complaintRepository;
        this.floorInchargeRepository = floorInchargeRepository;
    }

    public Complaint createComplaint(Complaint complaint) {

        FloorIncharge incharge =
                floorInchargeRepository
                        .findByBlockNameAndFloor(
                                complaint.getBlockName(),
                                complaint.getFloor())
                        .orElse(null);

        if (incharge != null) {
            complaint.setAssignedTo(
                    incharge.getFacultyEmail());
        }

        complaint.setStatus("OPEN");

        return complaintRepository.save(complaint);
    }
}