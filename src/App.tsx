import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import Projects from "./pages/Projects";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className={`app-shell ${darkMode ? "theme-dark" : ""}`}>
          <div className="app-card">
            <header className="app-header">
              <div>
                <div className="app-title">Task Manager</div>
                <div className="app-subtitle">
                  Manage projects, tasks, priorities and due dates.
                </div>
              </div>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setDarkMode((prev) => !prev)}
              >
                {darkMode ? "Light mode" : "Dark mode"}
              </button>
            </header>

            <Routes>
              <Route path="/" element={<Login />} />
              <Route
                path="/projects"
                element={
                  <ProtectedRoute>
                    <Projects />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
