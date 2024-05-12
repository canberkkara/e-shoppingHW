package com.berk.eshopping.controller;

import com.berk.eshopping.entity.product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class productController {

    @Autowired
    private com.berk.eshopping.service.productService productService;

    @GetMapping("/api/products")
    public List<product> getAllProducts() {
        return productService.getAllProducts();
    }
}