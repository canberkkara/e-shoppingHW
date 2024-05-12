package com.berk.eshopping.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class product {
    @Id
    private String name;

    private float price;

    private String description;

    private String category;

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getName() {
        return name;
    }

    public float getPrice() {
        return price;
    }

    public String getDescription() {
        return description;
    }

    public String getCategory() {
        return category;
    }
}
