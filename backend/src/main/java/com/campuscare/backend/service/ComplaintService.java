package com.campuscare.backend.service;

import org.springframework.stereotype.Service;

import com.campuscare.backend.model.Complaint;
import com.campuscare.backend.model.FloorIncharge;
import com.campuscare.backend.model.User;
import com.campuscare.backend.repository.ComplaintRepository;
import com.campuscare.backend.repository.FloorInchargeRepository;
import com.campuscare.backend.repository.UserRepository;

@Service
public class ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final FloorInchargeRepository floorInchargeRepository;
    private final UserRepository userRepository;

    public ComplaintService(
            ComplaintRepository complaintRepository,
            FloorInchargeRepository floorInchargeRepository,
            UserRepository userRepository) {

        this.complaintRepository = complaintRepository;
        this.floorInchargeRepository = floorInchargeRepository;
        this.userRepository = userRepository;
    }

    public Complaint createComplaint(
            Complaint complaint) {

        FloorIncharge incharge =
                floorInchargeRepository
                        .findByBlockNameAndFloor(
                                complaint.getBlockName(),
                                complaint.getFloor())
                        .orElse(null);

        if (incharge != null) {

            complaint.setAssignedFacultyName(
                    incharge.getFacultyName());

            complaint.setAssignedFacultyEmail(
                    incharge.getFacultyEmail());

            complaint.setAssignedLocation(
                    incharge.getBlockName()
                            + " - Floor "
                            + incharge.getFloor());

            complaint.setAssignedTo(
                    incharge.getFacultyName());

            User faculty =
                    userRepository
                            .findByEmail(
                                    incharge.getFacultyEmail())
                            .orElse(null);

            if (faculty != null) {

                complaint.setAssignedFacultyId(
                        faculty.getId());

            }
        }

        complaint.setStatus("OPEN");

        return complaintRepository.save(
                complaint);
    }
}