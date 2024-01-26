import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
const BookFlight = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state;
  const [selectedSeats, setSelectedSeats] = useState(new Set());
  const pStyle = "flex-1 text-center";
  console.log("data: ", data);

  const selectSeat = (seatNumber) => {
    const newSet = new Set(selectedSeats);
    newSet.add(seatNumber);
    setSelectedSeats(newSet);
  };
  const bookSeats = () => {
    const seats = Array.from(selectedSeats);
    const updatedVacantSeats = data.vacantSeats.filter(
      (item) => !seats.includes(item),
    );
    data.vacantSeats = [...updatedVacantSeats];
    data.bookedSeats = [...data.bookedSeats, ...seats];
    setSelectedSeats(new Set());
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
                      className="py-3 px-5 text-white bg-gray-600 rounded-md hover:bg-green-500 "
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
      </div>
    </>
  );
};
export default BookFlight;
