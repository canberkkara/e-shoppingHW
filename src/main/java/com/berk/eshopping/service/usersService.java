package com.berk.eshopping.service;

import com.berk.eshopping.entity.users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class usersService {

    @Autowired
    private com.berk.eshopping.repository.usersRepository usersRepository;

    public List<users> getAllUsers() {
        return usersRepository.findAll();
    }

    public users create(users user){
        return usersRepository.save(user);
    }
}
