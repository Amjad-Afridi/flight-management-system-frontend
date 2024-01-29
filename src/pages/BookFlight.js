import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
const BookFlight = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state;
  console.log("data: ", data);
  const [selectedSeats, setSelectedSeats] = useState(new Set());
  const [error, setError] = useState(null);
  const pStyle = "flex-1 text-center";
  console.log("data: ", data);

  const selectSeat = (seatNumber) => {
    const newSet = new Set(selectedSeats);
    if (newSet.has(seatNumber)) {
      newSet.delete(seatNumber);
    } else {
      newSet.add(seatNumber);
    }
    setSelectedSeats(newSet);
  };
  const bookSeats = async () => {
    const seats = Array.from(selectedSeats) || [];
    const updatedVacantSeats = data.vacantSeats.filter(
      (item) => !seats.includes(item),
    );
    data.vacantSeats = [...updatedVacantSeats];
    data.bookedSeats = [...data.bookedSeats, ...seats];
    setSelectedSeats(new Set());
    try {
      const response = axios.patch(
        `http://localhost:3001/flight/book-seat/${data._id}`,
        {
          vacantSeats: data.vacantSeats,
          bookedSeats: data.bookedSeats,
        },
      );
      setError(null);
    } catch (e) {
      console.log(e.message);
      setError(e.response.data);
    }
    try {
      const response = axios.post("http://localhost:3001/user-booking", {
        data: data,
        userBookedSeats: seats,
        user: user,
      });
      console.log("user booking details are: ", response);
    } catch (e) {
      console.log(e.message);
    }
    alert("Booking done successfully");
  };
  const backToHome = (data) => {
    navigate("/");
  };

  return (
    <>
      <div className="bg-blue-950 w-full h-[100vh] p-0 pt-16">
        <div
          className="overflow-x-auto w-[70%] m-auto px-16 mt-8 bg-white py-8 border-2
         border-blue-950 rounded-lg"
        >
          <h1 className="text-blue-950 text-4xl text-center mb-8">
            Flight Booking Details{" "}
          </h1>
          <div
            className="flex justify-evenly items-center font-bold py-4 mt-4 border-b-[1px]
          border-blue-950 bg-blue-950 text-white rounded-lg"
          >
            <p className={pStyle}>Flight Name</p>
            <p className={pStyle}>Flight Number</p>
            <p className={pStyle}>Class</p>
            <p className={pStyle}>Stops</p>
          </div>
          <div className="flex justify-evenly items-center mx-auto my-4">
            <p className={pStyle}>{data.planeType}</p>
            <p className={pStyle}>{data.airplaneNumber}</p>
            <p className={pStyle}>{data.class}</p>
            <p className={pStyle}>{data.stops.map((stop) => stop + " / ")}</p>
          </div>

          <div className="flex flex-col gap-8 py-8 mx-auto w-full">
            <h3 className="font-bold text-xl text-blue-950 ">Filled Seats</h3>
            <div className="flex items-center gap-8 flex-wrap w-full">
              {data.bookedSeats.map((seat) => {
                return (
                  <>
                    <div className="py-3 px-5 text-white bg-green-700 rounded-md">
                      {seat}
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-8 py-8 mx-auto w-full">
            <h3 className="font-bold text-xl text-blue-950 ">Vacant Seats</h3>
            <div className="flex items-center gap-8 flex-wrap w-full">
              {data.vacantSeats.map((seat) => {
                return (
                  <>
                    <button
                      onClick={() => selectSeat(seat)}
                      className={`py-3 px-5 text-white ${
                        selectedSeats.has(seat)
                          ? "bg-green-600 hover:bg-gray-600"
                          : "bg-gray-600 hover:bg-green-600"
                      } rounded-md`}
                    >
                      {seat}
                    </button>
                  </>
                );
              })}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={bookSeats}
              className="bg-blue-950 mt-4 px-5 py-3 rounded-md text-white text-lg"
            >
              Confirm Booking
            </button>
            <button
              onClick={backToHome}
              className="bg-blue-950 mt-4 px-5 py-3 rounded-md text-white text-lg"
            >
              Back to homepage
            </button>
          </div>
        </div>
        {error && <p>{error}</p>}
      </div>
    </>
  );
};
export default BookFlight;
