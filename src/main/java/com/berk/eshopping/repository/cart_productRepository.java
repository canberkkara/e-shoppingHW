package com.berk.eshopping.repository;

import com.berk.eshopping.entity.cart_product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface cart_productRepository extends JpaRepository<cart_product, Long> {
}
