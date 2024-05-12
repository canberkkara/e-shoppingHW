import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onLoginButtonClick = async () => {
    const response = await fetch("http://localhost:8080/api/user_credentials");
    if (response.ok) {
      const credentials = await response.json();
      const user = credentials.find(
        (user: { email: string; password: string }) =>
          user.email === email && user.password === password
      );
      if (user) {
        navigate("/mainpage", { state: email });
      } else {
        alert("Invalid email or password.");
      }
    } else {
      console.error("Failed to fetch user credentials.");
    }
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    surname: "",
    birthdate: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      formData.email != "" &&
      formData.password != "" &&
      formData.name != "" &&
      formData.surname != "" &&
      formData.birthdate != ""
    ) {
      const response = await fetch("http://localhost:8080/api/adduser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("User added successfully!");
        alert("E-mail registered!");
        setEmail("");
        setPassword("");
        setFormData({
          email: "",
          password: "",
          name: "",
          surname: "",
          birthdate: "",
        });
      } else {
        console.error("Failed to add user.");
        alert("Couldn't register!");
      }
    } else alert("Fill the form!");
  };

  return (
    <div className="loginPage">
      <div className="topBar">
        <h1>E-shopping</h1>
      </div>
      <div className="loginGrid">
        <div className="loginSide">
          <h2>Login</h2>
          <input
            value={email}
            type="email"
            className="loginInput"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            value={password}
            type="password"
            className="loginInput"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="loginButton"
            onClick={onLoginButtonClick}
          >
            Log in
          </button>
        </div>
        <form onSubmit={handleSubmit} className="singupSide">
          <h2>Sign Up</h2>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="loginInput"
            placeholder="Enter Your Email Address"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="loginInput"
            placeholder="Enter Your New Password"
          />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="loginInput"
            placeholder="Enter Your Name"
          />
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            className="loginInput"
            placeholder="Enter Your Surname"
          />
          <input
            type="date"
            className="loginInput"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
          />
          <button type="submit" className="loginButton">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}
