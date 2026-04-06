import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/authApi";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    try {
      await register({ fullName: name, email, password });
      alert("Registration successful. Please log in.");
      navigate("/");
    } catch (error) {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div>
          <h2 className="auth-title">Create account</h2>
          <p className="auth-subtitle">Sign up to start managing your tasks.</p>
        </div>

        {loading && (
          <p className="muted">
            ⏳ Starting server... first request may take 1–2 minutes.
          </p>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              className="input"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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
              minLength={6}
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

            <span className="muted">
              Password must be at least 6 characters
            </span>
          </div>

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

          <button
            className="btn btn-ghost"
            type="button"
            onClick={() => navigate("/")}
            disabled={loading}
          >
            Back to login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
