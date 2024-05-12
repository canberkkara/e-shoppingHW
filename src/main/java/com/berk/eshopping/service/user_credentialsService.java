package com.berk.eshopping.service;

import com.berk.eshopping.entity.user_credentials;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class user_credentialsService {

    @Autowired
    private com.berk.eshopping.repository.user_credentialsRepository user_credentialsRepository;

    public List<user_credentials> getAllUser_credentials() {
        return user_credentialsRepository.findAll();
    }
}