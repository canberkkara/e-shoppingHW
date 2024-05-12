import React, { useState } from "react";
import "./Connect.css";

function Connect() {
  const [humans, setHumans] = useState([]);
  const [message, setMessage] = useState("");

  const connectToDatabase = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/grantaccess", {
        method: "POST",
      });
      if (response.ok) {
        setMessage("CONNECTION TO DATABASE SUCCESSFUL!");
      } else {
        console.error("Error accessing database:", response.statusText);
      }
    } catch (error) {
      console.error("Error accessing database:", error);
    }
  };

  const fetchData = async () => {
    fetch("http://localhost:8080/api/humans", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data received:", data);
        setHumans(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  return (
    <div>
      <button onClick={connectToDatabase}>Connect to Database</button>
      <p>{message}</p>
      <button onClick={fetchData}>Fetch Data</button>
      <h1>Person List</h1>
      <ul>
        {humans.map((human) => (
          <li key={human.id}>{human.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Connect;
