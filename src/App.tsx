import { useState, useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useNavigate,
} from "react-router-dom";
import Login from "./pages/Login";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import Projects from "./pages/Projects";
import Register from "./pages/Register";
import ChatbotLauncher from "./components/ChatbotLauncher";
import { Sun, Moon } from "lucide-react";

interface AppContentProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const AppContent = ({ darkMode, toggleDarkMode }: AppContentProps) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    auth?.logout();
    navigate("/");
  };

  const userLabel =
    (auth?.user &&
      (auth.user.email || auth.user.username || auth.user.name)) ||
    null;

  return (
    <div className={`app-shell ${darkMode ? "theme-dark" : ""}`}>
      <div className="app-card">
        <header className="app-header">
          <div>
            <div className="app-title">Task Manager</div>
            <div className="app-subtitle">
              Manage projects, tasks, priorities and due dates.
            </div>
          </div>
          <div className="app-header-right">
            {userLabel && (
              <span className="app-user">{userLabel}</span>
            )}
            {auth?.user && (
              <button
                type="button"
                className="btn btn-ghost"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
            <button
              type="button"
              className="btn btn-ghost"
              onClick={toggleDarkMode}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </header>

        {auth?.user && (
          <nav className="app-nav">
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                "app-nav-link" + (isActive ? " app-nav-link-active" : "")
              }
            >
              Projects
            </NavLink>
          </nav>
        )}

        {!auth?.user && (
          <nav className="app-nav">
            <NavLink
              to="/"
              className={({ isActive }) =>
                "app-nav-link" + (isActive ? " app-nav-link-active" : "")
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                "app-nav-link" + (isActive ? " app-nav-link-active" : "")
              }
            >
              Register
            </NavLink>
          </nav>
        )}

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            }
          />
        </Routes>
        <ChatbotLauncher />
      </div>
    </div>
  );
};

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode((prev) => !prev)}
        />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
