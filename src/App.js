import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddFlight from "./pages/AddFlight";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import BookFlight from "./pages/BookFlight";
import UserBookings from "./pages/UserBookings";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/user/login");
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="add-flight" element={<AddFlight />} />
        </Route>
        <Route path="/book-flight" element={<BookFlight />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user-bookings" element={<UserBookings />} />
      </Routes>
    </>
  );
}
export default App;
