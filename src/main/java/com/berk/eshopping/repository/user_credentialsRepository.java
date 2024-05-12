package com.berk.eshopping.repository;

import com.berk.eshopping.entity.user_credentials;
import org.springframework.data.jpa.repository.JpaRepository;

public interface user_credentialsRepository extends JpaRepository<user_credentials, String> {
}