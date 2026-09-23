package com.campuscare.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.campuscare.backend.model.FloorIncharge;
import com.campuscare.backend.model.User;
import com.campuscare.backend.repository.FloorInchargeRepository;
import com.campuscare.backend.repository.UserRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final FloorInchargeRepository floorInchargeRepository;

    public DataInitializer(UserRepository userRepository, FloorInchargeRepository floorInchargeRepository) {
        this.userRepository = userRepository;
        this.floorInchargeRepository = floorInchargeRepository;
    }

    @Override
    public void run(String... args) {
        try {
            seedUser("hod.cse@eec.srmrmp.edu.in", "HOD CSE", "password123", "FACULTY", "CSE", "Block A - Floor 1");
            seedUser("principal@eec.srmrmp.edu.in", "Dr. Deiva Sundari", "password123", "PRINCIPAL", "Administration", "Main Block");
            seedUser("negesh@eec.srmrmp.edu.in", "Negesh Bala", "password123", "STUDENT", "CSE (AIML)", null);
            seedUser("negeshbalam@gmail.com", "Negesh Bala", "password123", "STUDENT", "CSE (AIML)", null);
            seedUser("asst.manager.maintenance@srmrmp.edu.in", "Muthukumar", "password123", "MANAGER", "Maintenance", "Main Block");

            seedFloorIncharge("Block A", 1, "HOD CSE", "hod.cse@eec.srmrmp.edu.in");
            seedFloorIncharge("Block A", 2, "Dr. Deiva Sundari", "principal@eec.srmrmp.edu.in");
        } catch (Exception e) {
            System.err.println("DataInitializer warning: " + e.getMessage());
        }
    }

    private void seedUser(String email, String name, String password, String role, String department, String location) {
        if (userRepository.findByEmail(email).isEmpty()) {
            User user = new User();
            user.setEmail(email);
            user.setName(name);
            user.setPassword(password);
            user.setRole(role);
            user.setDepartment(department);
            user.setAssignedLocation(location);
            userRepository.save(user);
            System.out.println("Seeded user: " + email);
        }
    }

    private void seedFloorIncharge(String block, Integer floor, String name, String email) {
        if (floorInchargeRepository.findByBlockNameAndFloor(block, floor).isEmpty()) {
            FloorIncharge fi = new FloorIncharge();
            fi.setBlockName(block);
            fi.setFloor(floor);
            fi.setFacultyName(name);
            fi.setFacultyEmail(email);
            floorInchargeRepository.save(fi);
            System.out.println("Seeded floor incharge: " + block + " floor " + floor);
        }
    }
}
