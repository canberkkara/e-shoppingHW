package com.berk.eshopping.service;

import com.berk.eshopping.entity.cart_product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class cart_productService {

    @Autowired
    private com.berk.eshopping.repository.cart_productRepository cartProductRepository;

    public List<cart_product> getAllCart_Products() {
        return cartProductRepository.findAll();
    }

    public cart_product create(cart_product cartProduct){
        return cartProductRepository.save(cartProduct);
    }

    public String deleteCart_product(Long id){
        cartProductRepository.deleteById(id);
        return "Deleted";
    }

    public cart_product update(cart_product cartProduct){
        return cartProductRepository.save(cartProduct);
    }
}
