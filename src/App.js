import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddFlight from "./pages/AddFlight";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import BookFlight from "./pages/BookFlight";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/user/login");
  }, []);

  return (
    <>
      {/*<Register />*/}
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="add-flight" element={<AddFlight />} />
        </Route>
        <Route path="/book-flight" element={<BookFlight />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
