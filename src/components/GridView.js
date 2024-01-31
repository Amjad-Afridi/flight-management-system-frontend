import { useNavigate } from "react-router-dom";

const GridView = ({ data }) => {
  const navigate = useNavigate();
  const handleBooking = (flight) => {
    navigate("/book-flight", { state: { data: flight } });
  };
  return (
    <>
      <div className="grid grid-cols-4 gap-8 bg-white p-8 text-blue-950 rounded-lg ">
        {data.map((flight) => {
          return (
            <>
              <div className="flex flex-col items-start gap-4 rounded-md border-blue-950 border-[1px] p-4">
                <p>Plane Name: {flight.planeType}</p>
                <p>Class: {flight.class}</p>
                <p>
                  Stops:{" "}
                  {flight.stops.map((stop, index) => {
                    if (index === flight.stops.length - 1) return stop;
                    else return stop + " -> ";
                  })}
                </p>
                <p>Vacant Seats: {flight.vacantSeats.length}</p>
                <button
                  onClick={() => handleBooking(flight)}
                  className="font-medium text-blue-950 hover:underline"
                >
                  book now!
                </button>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default GridView;
