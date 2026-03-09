import { useState, useContext } from "react";
import { login } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      auth?.login(data.token, data.user ?? data);
      navigate("/projects");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  const handleTestLogin = async () => {
    try {
      const data = await login("prod1@test.com", "password123");
      auth?.login(data.token, data.user ?? data);
      navigate("/projects");
    } catch (error) {
      alert("Test login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div>
          <h2 className="auth-title">Welcome back</h2>
          <p className="auth-subtitle">Sign in to manage your projects.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn btn-primary" type="submit">
            Login
          </button>
          <button
            className="btn btn-ghost"
            type="button"
            onClick={handleTestLogin}
          >
            Test login (demo)
          </button>
          <button
            className="btn btn-ghost"
            type="button"
            onClick={() => navigate("/register")}
          >
            Create an account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
