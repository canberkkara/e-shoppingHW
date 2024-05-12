package com.berk.eshopping.service;

import com.berk.eshopping.entity.product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class productService {

    @Autowired
    private com.berk.eshopping.repository.productRepository productRepository;

    public List<product> getAllProducts() {
        return productRepository.findAll();
    }
}
