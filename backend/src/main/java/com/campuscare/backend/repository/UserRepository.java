package com.campuscare.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.campuscare.backend.model.User;

public interface UserRepository
        extends JpaRepository<User, Long> {

    Optional<User> findByEmail(
            String email);

    List<User> findByRole(
            String role);

    Optional<User> findByAssignedLocation(
            String assignedLocation);
}