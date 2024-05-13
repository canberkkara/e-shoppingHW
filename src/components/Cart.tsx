import { useEffect, useState } from "react";
import "./Cart.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const [userid, setUserid] = useState("quest");
  const [products, setProducts] = useState<
    Array<{
      cart_owner: string;
      product_name: string;
      added_date: string;
      id: number;
      amount: number;
    }>
  >([]);

  useEffect(() => {
    if (state != null) {
      setUserid(state);
    } else navigate("/");
  }, [state]); // Add state as dependency to useEffect

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/cart_products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        console.log("Data from API:", data); // Log data here
        const filteredProducts = data.filter(
          (product: {
            cart_owner: string;
            product_name: string;
            added_date: string;
            id: number;
            amount: number;
          }) => product.cart_owner === userid
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [userid]); // Add userid as dependency to useEffect

  const deleteProduct = async (productId: number) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/deletecart_product/${productId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      // Remove the deleted product from the local state
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const updateAmount = async (productId: number, newAmount: number) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/update_amount/${productId}?amount=${newAmount}`,
        {
          method: "PUT",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update product amount");
      }
      // Update the amount in the local state
      setProducts(
        products.map((product) =>
          product.id === productId ? { ...product, amount: newAmount } : product
        )
      );
    } catch (error) {
      console.error("Error updating product amount:", error);
    }
  };

  return (
    <div className="cartPage">
      <button
        className="goBackButton"
        onClick={() => navigate("/mainpage", { state: state })}
      >
        Go Back
      </button>
      <h1>Cart of {userid}</h1>
      <table>
        <thead>
          <tr>
            <th>Owner</th>
            <th>Product</th>
            <th>Addition date</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.cart_owner}</td>
              <td>{product.product_name}</td>
              <td>{product.added_date}</td>
              <td>
                <input
                  type="number"
                  value={product.amount}
                  onChange={(e) => {
                    const newAmount = parseInt(e.target.value, 10);
                    if (!isNaN(newAmount)) {
                      updateAmount(product.id, newAmount);
                    }
                  }}
                />
              </td>
              <td>
                <button onClick={() => deleteProduct(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
