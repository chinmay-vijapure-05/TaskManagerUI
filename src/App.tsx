// import { BrowserRouter, Routes, Route } from "react-router-dom";
import api from "./api/axios";
import { useEffect } from "react";

function App() {
  // remote client call to backend
  useEffect(() => {
    api
      .get("/actuator/health")
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  }, []);

  // returns
  return <h1>Task Manager UI</h1>;

  // return (
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path="/" element={<h1>Home</h1>} />
  //       <Route path="/login" element={<h1>Login Page</h1>} />
  //       <Route path="/dashboard" element={<h1>Dashboard</h1>} />
  //     </Routes>
  //   </BrowserRouter>
  // );
}

export default App;
