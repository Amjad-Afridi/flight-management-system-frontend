"use client";
import { Table } from "flowbite-react";
import { AiOutlineLogout } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../redux/userSlice";
import AddFlight from "./AddFlight";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.user);
  const [data, setData] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [classType, setClassType] = useState(null);
  const [flightName, setFlightName] = useState(null);
  const [stop, setStop] = useState(null);
  const [resetResults, setResetResults] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const inputStyles =
    "rounded-md p-3 text-md outline-none border border-b-[1px] border-0";
  const paginationStyles =
    "bg-white text-blue-950 p-2 rounded-md flex items-center gap-1";
  const fetchData = async (pageNumber = 1, limit = 8) => {
    var url;
    if (classType && stop && flightName) {
      console.log("all searched");
      url = `http://localhost:3001/flight?page=${pageNumber}&limit=${limit}&class=${classType}&stop=${stop}&planeType=${flightName}`;
    } else if (classType && flightName) {
      url = `http://localhost:3001/flight?page=${pageNumber}&limit=${limit}&class=${classType}&planeType=${flightName}`;
    } else if (stop && flightName) {
      url = `http://localhost:3001/flight?page=${pageNumber}&limit=${limit}&stop=${stop}&planeType=${flightName}`;
    } else if (classType && stop) {
      url = `http://localhost:3001/flight?page=${pageNumber}&limit=${limit}&class=${classType}&stop=${stop}`;
    } else if (classType) {
      console.log("classType executed!");
      url = `http://localhost:3001/flight?page=${pageNumber}&limit=${limit}&class=${classType}`;
    } else if (stop) {
      url = `http://localhost:3001/flight?page=${pageNumber}&limit=${limit}&stop=${stop}`;
    } else if (flightName) {
      url = `http://localhost:3001/flight?page=${pageNumber}&limit=${limit}&planeType=${flightName}`;
    } else {
      url = `http://localhost:3001/flight?page=${pageNumber}&limit=${limit}`;
    }
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
  const handleStops = (e) => {
    setStop(e.target.value);
  };
  const reset = (e) => {
    fetchData(1, 8);
    if (resetResults) {
      setResetResults(false);
    }
  };
  const logoutUser = () => {
    dispatch(logout());
    navigate("/user/login");
  };
  const handleBooking = (flight) => {
    navigate("/book-flight", { state: { data: flight } });
  };
  const submitForm = (e) => {
    e.preventDefault();
    if (!stop && !flightName && !classType) return;
    const pageNumber = 1;
    const limit = 8;
    fetchData(pageNumber, limit);
    setStop("");
    setFlightName("");
    setClassType("");
    setResetResults(true);
  };
  useEffect(() => {
    fetchData(1, 8);
  }, [token]);

  return (
    <>
      {
        <div className="bg-blue-950 w-full h-[100vh] p-0">
          <header className="flex items-center justify-between p-8 bg-white h-[12vh] ">
            <h1 className="font-bold text-4xl text-blue-950">
              {" "}
              Contegris Airlines Booking App
            </h1>
            <button
              onClick={logoutUser}
              className="flex items-center gap-2 bg-blue-950 text-white px-4 py-2 rounded-md"
            >
              Logout {user && user.username}
              <AiOutlineLogout />
            </button>
          </header>
          <div className="overflow-x-auto w-[80%] m-auto mt-8">
            <form
              className="flex my-4 justify-between bg-white p-4 rounded-lg"
              onSubmit={submitForm}
            >
              <div className="flex gap-4 ">
                <input
                  type="text"
                  value={classType}
                  className={inputStyles}
                  onChange={handleClassType}
                  placeholder="Search flight by classs"
                />
                <input
                  type="text"
                  value={flightName}
                  className={inputStyles}
                  onChange={handleFlightName}
                  placeholder="Search flight by name"
                />
                <input
                  type="text"
                  value={stop}
                  className={inputStyles}
                  onChange={handleStops}
                  placeholder="Search flight by stops"
                />
              </div>

              <button className="flex items-center bg-blue-950 px-6 rounded-md text-lg text-white">
                Search
              </button>
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
              {data ? (
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
              ) : (
                <p className="text-blue-950 text-lg text-center">loading</p>
              )}
            </Table>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4 w-full text-lg text-white my-4">
                {previousPage && (
                  <button onClick={handlePrev} className={paginationStyles}>
                    Prev
                    <GrFormPrevious /> {previousPage.previousPage}{" "}
                  </button>
                )}
                {nextPage && (
                  <button onClick={handleNext} className={paginationStyles}>
                    {" "}
                    Next
                    <MdNavigateNext /> {nextPage.nextPage}{" "}
                  </button>
                )}
              </div>
              <button
                onClick={() => {
                  setShowModal(true);
                  navigate("/add-flight");
                }}
                className="px-4 py-2 rounded-md text-white bg-blue-950 whitespace-nowrap "
              >
                Add Flight
              </button>
              {showModal && <AddFlight />}
            </div>
            {resetResults && (
              <button
                onClick={reset}
                className="flex items-center bg-white px-5 py-2 rounded-md text-lg text-blue-950"
              >
                {" "}
                Reset{" "}
              </button>
            )}
          </div>
        </div>
      }
      <Outlet />
    </>
  );
};
export default Home;
