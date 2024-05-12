package com.berk.eshopping.repository;

import com.berk.eshopping.entity.users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface usersRepository extends JpaRepository<users, String> {
}
