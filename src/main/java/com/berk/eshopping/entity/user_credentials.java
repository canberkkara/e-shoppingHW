package com.berk.eshopping.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class user_credentials {
    @Id
    private String email;

    private String password;

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}
