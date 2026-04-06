import { useState, useContext } from "react";
import { login } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = await login(email, password);
      auth?.login(data.token, data.user ?? data);
      navigate("/projects");
    } catch (error) {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleTestLogin = async () => {
    setLoading(true);

    try {
      const data = await login("name@test.com", "myname123");
      auth?.login(data.token, data.user ?? data);
      navigate("/projects");
    } catch (error) {
      alert("Test login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div>
          <h2 className="auth-title">Welcome back</h2>
          <p className="auth-subtitle">Sign in to manage your projects.</p>
        </div>

        {loading && (
          <p className="muted">
            ⏳ Starting server... first login may take 1–2 minutes.
          </p>
        )}

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

          <div className="field" style={{ position: "relative" }}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="input"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "38px",
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <button
            className="btn btn-ghost"
            type="button"
            onClick={handleTestLogin}
            disabled={loading}
          >
            Test login (demo)
          </button>

          <button
            className="btn btn-ghost"
            type="button"
            onClick={() => navigate("/register")}
            disabled={loading}
          >
            Create an account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
