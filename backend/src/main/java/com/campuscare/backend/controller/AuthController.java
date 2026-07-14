package com.campuscare.backend.controller;

import java.util.Map;

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
    public User login(
            @RequestBody Map<String, String> request) {

        String email = request.get("email");
        String password = request.get("password");

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid Password");
        }

        return user;
    }
    @PostMapping("/google-login")
public User googleLogin(
        @RequestBody Map<String, String> request) {

    String email = request.get("email");
    String name = request.get("name");

    if (!email.endsWith("@eec.srmrmp.edu.in")) {
        throw new RuntimeException(
                "Only college email accounts are allowed");
    }

    User user = userRepository
            .findByEmail(email)
            .orElse(null);

    if (user == null) {

       user = new User();

user.setName(name);
user.setEmail(email);

user.setRole("STUDENT");
user.setDepartment("ECE");
user.setPassword("GOOGLE_LOGIN");

user = userRepository.save(user);
    }

    return user;
}
}