import { ChangeEvent, useEffect, useState } from "react";
import "./Mainpage.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function Mainpage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  const [userid, setUserid] = useState("default_user");
  const [products, setProducts] = useState<
    Array<{
      name: string;
      price: number;
      description: string;
      category: string;
    }>
  >([]);

  const [filteredProducts, setFilteredProducts] = useState<
    Array<{
      name: string;
      price: number;
      description: string;
      category: string;
    }>
  >([]);

  useEffect(() => {
    if (state != null) {
      setUserid(state);
    }

    // Fetch data when component mounts
    fetchData();
  }, [state]); // Add state as a dependency to useEffect

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      console.log("Data from API:", data); // Log data here
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const [textInput, setTextInput] = useState("");
  const [selectedOption, setSelectedOption] = useState("option1");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  };

  const handleDropdownChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleSearch = async () => {
    // Filter products based on search text and selected category
    const filtered = products.filter((product) => {
      const searchTextMatch = product.name
        .toLowerCase()
        .includes(textInput.toLowerCase());
      const categoryMatch =
        selectedOption === "Any" || product.category === selectedOption;
      return searchTextMatch && categoryMatch;
    });
    setFilteredProducts(filtered);
  };

  const handleAddToCart = async (productName: string) => {
    // Check if userid is not "default_user"
    if (userid !== "default_user") {
      try {
        const response = await fetch(
          "http://localhost:8080/api/addcart_product",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cart_owner: userid,
              product_name: productName,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to add product to cart");
        }
        console.log("Product added to cart:", productName);
        // You can add further handling here, such as updating UI to reflect the addition to cart
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
    } else {
      console.log("Cannot add to cart. User not logged in.");
    }
  };

  return (
    <div className="mainPage">
      <div className="mainPageBar">
        <h1 className="pageTitle">Welcome {userid}</h1>
        <div className="mainPageBarButtons">
          <button
            className="cartButton"
            onClick={() => navigate("/cart", { state: state })}
          >
            Show Cart
          </button>
          <button className="cartButton" onClick={() => navigate("/")}>
            Log Out
          </button>
        </div>
      </div>
      <div className="searchBar">
        <input
          type="searchBartext"
          value={textInput}
          onChange={handleInputChange}
          placeholder="Type: "
        />
        <select
          className="selectCategory"
          value={selectedOption}
          onChange={handleDropdownChange}
        >
          <option value="Any">Any</option>
          <option value="Clothing">Clothing</option>
          <option value="Technology">Technology</option>
          <option value="Cosmetics">Cosmetics</option>
          <option value="Home and Living">Home and Living</option>
        </select>
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div>
        <h2>Products</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((filteredProducts, index) => (
              <tr key={index}>
                <td>{filteredProducts.name}</td>
                <td>{filteredProducts.price}</td>
                <td>{filteredProducts.category}</td>
                <td>
                  <button
                    onClick={() => handleAddToCart(filteredProducts.name)}
                  >
                    Add to Cart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
