package com.berk.eshopping.controller;

import com.berk.eshopping.entity.cart_product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class cart_productController {

    @Autowired
    private com.berk.eshopping.service.cart_productService cart_productService;

    @GetMapping("/api/cart_products")
    public List<cart_product> getAllCart_products() {
        return cart_productService.getAllCart_Products();
    }

    @PostMapping("/api/addcart_product")
    public cart_product saveUser(@RequestBody cart_product cartProduct){
        return cart_productService.create(cartProduct);
    }

    @DeleteMapping("/api/deletecart_product/{id}")
    public String deleteCart_product(@PathVariable Long id){
        return cart_productService.deleteCart_product(id);
    }

    @PutMapping("/api/update_amount/{id}")
    public cart_product updateCartProduct(@PathVariable Long id, @RequestParam Long amount) {
        return cart_productService.updateCart_product(id, amount);
    }
}
