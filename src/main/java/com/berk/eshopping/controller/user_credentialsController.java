package com.berk.eshopping.controller;

import com.berk.eshopping.entity.user_credentials;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class user_credentialsController {

    @Autowired
    private com.berk.eshopping.service.user_credentialsService user_credentialsService;

    @GetMapping("/api/user_credentials")
    public List<user_credentials> getAllUser_credentials() {
        return user_credentialsService.getAllUser_credentials();
    }
}