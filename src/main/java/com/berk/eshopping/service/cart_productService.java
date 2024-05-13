package com.berk.eshopping.service;

import com.berk.eshopping.entity.cart_product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public cart_product updateCart_product(Long id, Long amount) {
        Optional<cart_product> optionalCartProduct = cartProductRepository.findById(id);
        if (optionalCartProduct.isPresent()) {
            cart_product cartProduct = optionalCartProduct.get();
            cartProduct.setAmount(amount);
            return cartProductRepository.save(cartProduct);
        } else {
            throw new RuntimeException("User not found with id: " + id);
        }
    }
}
