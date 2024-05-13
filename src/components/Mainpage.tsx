import { ChangeEvent, useEffect, useState } from "react";
import "./Mainpage.css";
import { useLocation, useNavigate } from "react-router-dom";

interface Product {
  name: string;
  price: number;
  description: string;
  category: string;
}

export default function Mainpage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state: string = location.state;

  const [userid, setUserid] = useState<string>("quest");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (state != null) {
      setUserid(state);
    }
    fetchData();
  }, [state]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data: Product[] = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const [textInput, setTextInput] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("Any");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  };

  const handleDropdownChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleSearch = async () => {
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

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = async () => {
    if (userid == "quest") {
      navigate("/");
    }
    if (userid !== "quest" && selectedProduct) {
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
              product_name: selectedProduct.name,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to add product to cart");
        }
        console.log("Product added to cart:", selectedProduct.name);
        setSelectedProduct(null);
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
          {userid === "quest" ? (
            <button className="cartButton" onClick={() => navigate("/")}>
              Log In
            </button>
          ) : (
            <button className="cartButton" onClick={() => navigate("/")}>
              Log Out
            </button>
          )}
        </div>
      </div>
      <div className="searchBar">
        <input
          type="search"
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
      <div className="product-list">
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
            {filteredProducts.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>
                  <button onClick={() => handleViewProduct(product)}>
                    View Product
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedProduct && (
        <div className="popup">
          <div className="popup-inner">
            <h2>{selectedProduct.name}</h2>
            <p>{selectedProduct.description}</p>
            <p>Price: {selectedProduct.price}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
            <button
              className="close-btn"
              onClick={() => setSelectedProduct(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
