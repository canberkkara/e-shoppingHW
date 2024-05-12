package com.berk.eshopping.controller;

import com.berk.eshopping.entity.users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class usersController {

    @Autowired
    private com.berk.eshopping.service.usersService usersService;

    @GetMapping("/api/users")
    public List<users> getAllUsers() {
        return usersService.getAllUsers();
    }
    
    @PostMapping("/api/adduser")
    public users saveUser(@RequestBody users user){
        System.out.println("Received birthdate: " + user.getBirthdate());
        return usersService.create(user);
    }
}
