package com.campuscare.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.campuscare.backend.model.FloorIncharge;
import com.campuscare.backend.repository.FloorInchargeRepository;

@RestController
@RequestMapping("/api/floor-incharge")
@CrossOrigin("*")
public class FloorInchargeController {

    private final FloorInchargeRepository repository;

    public FloorInchargeController(
            FloorInchargeRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<FloorIncharge> getAllFloorIncharges() {
        return repository.findAll();
    }

    @PostMapping
    public FloorIncharge createFloorIncharge(
            @RequestBody FloorIncharge floorIncharge) {

        return repository.save(floorIncharge);
    }
}