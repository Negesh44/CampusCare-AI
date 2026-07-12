package com.campuscare.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.campuscare.backend.model.FloorIncharge;

public interface FloorInchargeRepository
        extends JpaRepository<FloorIncharge, Long> {

    Optional<FloorIncharge> findByBlockNameAndFloor(
            String blockName,
            Integer floor
    );
}