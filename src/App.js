import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/user/login");
  }, []);

  return (
    <>
      {/*<Register />*/}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
