package com.campuscare.backend.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.campuscare.backend.model.User;
import com.campuscare.backend.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/test")
    public String test() {
        return "Auth Controller Working";
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody Map<String, String> request) {

        String email = request.get("email");
        String password = request.get("password");

        User user = userRepository
                .findByEmail(email)
                .orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "User not found"));
        }

        if (!user.getPassword().equals(password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid Password"));
        }

        return ResponseEntity.ok(user);
    }

    @PostMapping("/google-login")
    public ResponseEntity<?> googleLogin(
            @RequestBody Map<String, String> request) {

        String email = request.get("email");
        String name = request.get("name");

        if (email == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Email is required"));
        }

        boolean isCollegeEmail = email.endsWith("@eec.srmrmp.edu.in") || email.endsWith("@srmrmp.edu.in");
        boolean isDevEmail = email.equalsIgnoreCase("negeshbalam@gmail.com");

        if (!isCollegeEmail && !isDevEmail) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Only college email accounts are allowed"));
        }

        User user = userRepository
                .findByEmail(email)
                .orElse(null);

        // User already exists
        if (user != null) {
            return ResponseEntity.ok(user);
        }

        if (email.equalsIgnoreCase("asst.manager.maintenance@srmrmp.edu.in")) {
            user = new User();
            user.setName("Muthukumar");
            user.setEmail(email);
            user.setRole("MANAGER");
            user.setDepartment("Maintenance");
            user.setPassword("GOOGLE_LOGIN");
            return ResponseEntity.ok(userRepository.save(user));
        }

        if (email.equalsIgnoreCase("negeshbalam@gmail.com")) {
            user = new User();
            user.setName(name != null ? name : "Negesh Bala");
            user.setEmail(email);
            user.setRole("STUDENT");
            user.setDepartment("CSE");
            user.setPassword("GOOGLE_LOGIN");
            return ResponseEntity.ok(userRepository.save(user));
        }

        // New Student
        user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setRole("STUDENT");
        user.setDepartment("ECE");
        user.setPassword("GOOGLE_LOGIN");

        return ResponseEntity.ok(userRepository.save(user));
    }
}