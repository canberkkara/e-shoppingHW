package com.berk.eshopping.repository;

import com.berk.eshopping.entity.product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface productRepository extends JpaRepository<product, String> {
}
