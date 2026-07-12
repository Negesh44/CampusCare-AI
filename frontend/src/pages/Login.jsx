import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../services/api";
import logo from "../assets/eec-logo.png";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {

      const response =
        await API.post(
          "/api/auth/login",
          {
            email,
            password,
          }
        );

      const user = response.data;
      console.log(user);

localStorage.setItem(
  "user",
  JSON.stringify(user)
);  

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      if (user.role === "STUDENT") {
        navigate("/student");
      }
      else if (
        user.role === "FACULTY"
      ) {
        navigate("/faculty");
      }
      else if (
        user.role === "PRINCIPAL"
      ) {
        navigate("/principal");
      }

    } catch (error) {

      alert(
        "Invalid Login Credentials"
      );

    }
  };

  return (
    <div className="login-page">

      <div className="left-panel">
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src={logo}
            alt="EEC Logo"
            className="brand-logo"
          />

          <h1>CampusCare AI</h1>

          <h3 className="college-name">
            Easwari Engineering College (Autonomous)
          </h3>

          <p className="college-affiliation">
            Affiliated to Anna University • Chennai
          </p>

          <h2>
            Student-Centric Campus
            Complaint Management Platform
          </h2>

          <p className="platform-description">
            CampusCare AI is designed to simplify the way
            students report and track campus-related issues.
          </p>
        </motion.div>
      </div>

      <div className="right-panel">

        <motion.div
          className="login-card"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          <h2>
            Welcome Back 👋
          </h2>

          <p className="login-subtitle">
            Sign in using your college account
          </p>

          <input
            type="email"
            placeholder="College Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            className="login-btn"
            onClick={login}
          >
            Login
          </button>

          <button className="google-btn">
            Continue with Google
          </button>

          <p className="footer-text">
            CampusCare AI © 2026
          </p>

        </motion.div>

      </div>

    </div>
  );
}

export default Login;