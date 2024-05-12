package com.berk.eshopping.controller;

import com.berk.eshopping.entity.human;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class humanController {

    private boolean condition = false;

    @Autowired
    private com.berk.eshopping.service.humanService humanService;

    @GetMapping("/api/humans")
    public List<human> getAllHumans() {
        if (condition) {
            return humanService.getAllHumans();
        } else {
            return Collections.emptyList();
        }
    }

    @PostMapping("/api/grantaccess")
    public void grantAccess() {
        condition = true;
    }
}
