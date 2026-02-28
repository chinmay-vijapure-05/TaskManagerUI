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
      // Some backends return the user object as `user`, others inline.
      // Ensure we always store a truthy user so ProtectedRoute works.
      auth?.login(data.token, data.user ?? data);
      navigate("/projects");
    } catch (error) {
      alert("Invalid credentials");
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
        </form>
      </div>
    </div>
  );
};

export default Login;
