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
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {flight.planeType}
                  </Table.Cell>
                  <Table.Cell>{flight.class}</Table.Cell>
                  <Table.Cell>
                    {flight.stops.map((stop) => stop + ", ")}
                  </Table.Cell>
                  <Table.Cell>{flight.vacantSeats.length}</Table.Cell>
                  <Table.Cell>
                    <button
                      onClick={() => handleBooking(flight)}
                      className="font-medium text-blue-950 hover:underline dark:text-cyan-500"
                    >
                      book now!
                    </button>
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
