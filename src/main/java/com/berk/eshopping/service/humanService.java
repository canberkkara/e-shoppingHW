package com.berk.eshopping.service;

import com.berk.eshopping.entity.human;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class humanService {

    @Autowired
    private com.berk.eshopping.repository.humanRepository humanRepository;

    public List<human> getAllHumans() {
        return humanRepository.findAll();
    }

}
