package com.berk.eshopping.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class cart_product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    private String cart_owner;

    private String product_name;

    private String added_date;

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public Long getAmount() {
        return amount;
    }

    private Long amount;

    public void setAdded_date(String added_date) {
        this.added_date = added_date;
    }

    public String getAdded_date() {
        return added_date;
    }

    public void setCart_owner(String cart_owner) {
        this.cart_owner = cart_owner;
    }

    public void setProduct_name(String product_name) {
        this.product_name = product_name;
    }

    public String getCart_owner() {
        return cart_owner;
    }

    public String getProduct_name() {
        return product_name;
    }
}
