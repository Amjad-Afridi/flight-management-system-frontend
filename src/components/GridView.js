const GridView = ({ data }) => {
  const headerStyles =
    "text-blue-950 dark:text-white font-bold text-lg border-r-2 border-b-2 p-2";
  const colsStyle = "border-r-2 p-2 rounded-md";
  return (
    <>
      <div className="grid grid-cols-4 gap-8 bg-white p-8 text-blue-950 rounded-lg ">
        {data.map((flight) => {
          return (
            <>
              <div className="flex flex-col items-start gap-4 rounded-md border-blue-950 border-[1px] p-4">
                <p>Plane Name: {flight.planeType}</p>
                <p>Class: {flight.class}</p>
                <p>Stops: {flight.stops.map((stop) => stop + ", ")}</p>
                <p>Vacant Seats: {flight.vacantSeats.length}</p>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default GridView;
