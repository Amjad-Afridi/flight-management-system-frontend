"use client";
import { Table } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const DataTable = ({ data }) => {
  const navigate = useNavigate();
  const handleBooking = (flight) => {
    navigate("/book-flight", { state: { data: flight } });
  };
  return (
    <>
      <Table hoverable className="w-full">
        <Table.Head className="text-lg border-b-[2px] border-black ">
          <Table.HeadCell>Flight name</Table.HeadCell>
          <Table.HeadCell>Class Type</Table.HeadCell>
          <Table.HeadCell>Stops</Table.HeadCell>
          <Table.HeadCell>Vacant Seats</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Book Now</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {data.map((flight) => {
            return (
              <>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{flight.planeType}</Table.Cell>
                  <Table.Cell>{flight.class}</Table.Cell>
                  <Table.Cell>
                    {flight.stops.map((stop, index) => {
                      if (index === flight.stops.length - 1) return stop;
                      else return stop + " -> ";
                    })}
                  </Table.Cell>
                  <Table.Cell>{flight.vacantSeats.length}</Table.Cell>
                  <Table.Cell>
                    {flight.vacantSeats.length !== 0 ? (
                      <button
                        onClick={() => handleBooking(flight)}
                        className="font-medium text-blue-950 hover:underline dark:text-cyan-500"
                      >
                        book now!
                      </button>
                    ) : (
                      <button className="font-medium text-blue-950 hover:underline dark:text-cyan-500">
                        seats are full!
                      </button>
                    )}
                  </Table.Cell>
                </Table.Row>
              </>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
};
export default DataTable;
