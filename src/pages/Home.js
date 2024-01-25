"use client";
import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
const Home = () => {
  const { token, flightData } = useSelector((state) => state.user);
  const [data, setData] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [classType, setClassType] = useState(null);
  const [flightName, setFlightName] = useState(null);
  const fetchData = async (pageNumber, limit) => {
    const response = await axios.get(
      `http://localhost:3001/flight?page=${pageNumber}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    setData(response.data.data);
    if (response.data.next) {
      setNextPage(response.data.next);
    } else {
      setNextPage(null);
    }
    if (response.data.previous) {
      setPreviousPage(response.data.previous);
    } else {
      setPreviousPage(null);
    }
    console.log("response data: ", response.data);
  };

  const handlePrev = () => {
    const pageNumber = previousPage.previousPage;
    const limit = previousPage.limit;
    fetchData(pageNumber, limit);
  };
  const handleNext = () => {
    const pageNumber = nextPage.nextPage;
    const limit = nextPage.limit;
    fetchData(pageNumber, limit);
  };

  const handleClassType = (e) => {
    setClassType(e.target.value);
  };

  const handleFlightName = (e) => {
    setFlightName(e.target.value);
  };

  useEffect(() => {
    fetchData(1, 6);
    console.log("flightData: ", flightData);
  }, [token]);

  return (
    <>
      {data ? (
        <div className="bg-blue-950 w-full h-[100vh] p-0 pt-16">
          <div className="overflow-x-auto w-[60%] m-auto mt-8">
            <form>
              <input
                type="text"
                value={classType}
                onChange={handleClassType}
                placeholder="Search flight by class"
              />
              <input
                type="text"
                value={flightName}
                onChange={handleClassType}
                placeholder="Search flight by name"
              />
            </form>
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
              <Table.Body className="divide-y mt-4">
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
                          <a
                            href="#"
                            className="font-medium text-blue-950 hover:underline dark:text-cyan-500"
                          >
                            book now!
                          </a>
                        </Table.Cell>
                      </Table.Row>
                    </>
                  );
                })}
              </Table.Body>

              <div className="flex items-center justify-center mx-auto gap-16 w-full text-lg text-white my-4">
                {previousPage && (
                  <button
                    onClick={handlePrev}
                    className="flex items-center gap-1"
                  >
                    Prev
                    <GrFormPrevious /> {previousPage.previousPage}{" "}
                  </button>
                )}
                {nextPage && (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-1 "
                  >
                    {" "}
                    Next
                    <MdNavigateNext /> {nextPage.nextPage}{" "}
                  </button>
                )}
              </div>
            </Table>
          </div>
        </div>
      ) : (
        <p>loading</p>
      )}
    </>
  );
};
export default Home;
