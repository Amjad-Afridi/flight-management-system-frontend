("use client");
import { Spinner } from "flowbite-react";
import { AiOutlineLogout } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { HiOutlineSwitchVertical } from "react-icons/hi";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../redux/userSlice";
import AddFlight from "./AddFlight";
import DataTable from "../components/Table";
import GridView from "../components/GridView";

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
  const [showTable, setShowTable] = useState(true);
  const inputStyles =
    "rounded-md p-3 text-md outline-none border border-b-[1px] border-0";
  const paginationStyles =
    "flex items-center bg-white text-blue-950 p-2 rounded-md gap-1";
  const fetchData = async ({
    pageNumber = 1,
    limit = 8,
    classType = null,
    stop = null,
    flightName = null,
  }) => {
    var url;
    if (classType && stop && flightName) {
      url = `http://localhost:3001/flight?page=${pageNumber}&limit=${limit}&class=${classType}&stop=${stop}&planeType=${flightName}`;
    } else if (classType && flightName) {
      url = `http://localhost:3001/flight?page=${pageNumber}&limit=${limit}&class=${classType}&planeType=${flightName}`;
    } else if (stop && flightName) {
      url = `http://localhost:3001/flight?page=${pageNumber}&limit=${limit}&stop=${stop}&planeType=${flightName}`;
    } else if (classType && stop) {
      url = `http://localhost:3001/flight?page=${pageNumber}&limit=${limit}&class=${classType}&stop=${stop}`;
    } else if (classType) {
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
  };

  const switchView = () => {
    setShowTable(!showTable);
  };
  const handlePrev = () => {
    const pageNumber = previousPage.previousPage;
    const limit = previousPage.limit;
    fetchData({ pageNumber, limit, classType, flightName, stop });
  };
  const handleNext = () => {
    const pageNumber = nextPage.nextPage;
    const limit = nextPage.limit;
    fetchData({ pageNumber, limit, classType, flightName, stop });
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
    fetchData({});
    if (resetResults) {
      setResetResults(false);
    }
    setStop("");
    setFlightName("");
    setClassType("");
  };
  const logoutUser = () => {
    dispatch(logout());
    navigate("/user/login");
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (!stop && !flightName && !classType) return;
    fetchData({ classType, flightName, stop });
    setResetResults(true);
  };

  useEffect(() => {
    fetchData({});
  }, []);

  return (
    <>
      {
        <div className="bg-background-image bg-cover bg-center w-full h-[100vh] p-0">
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
          <div className="overflow-x-auto w-[70%] m-auto mt-8">
            <button
              onClick={switchView}
              className="flex items-center gap-2 bg-white py-2 px-4 text-blue-950 rounded-md"
            >
              Switch View <HiOutlineSwitchVertical size={20} />
            </button>
            <div className="bg-blue-950 rounded-lg">
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

                <button className="flex items-center gap-2 bg-blue-950 px-6 rounded-md text-lg text-white">
                  Search <IoSearch />
                </button>
              </form>
              {data ? (
                showTable ? (
                  <DataTable data={data} />
                ) : (
                  <GridView data={data} />
                )
              ) : (
                <div className="flex justify-center mt-4 bg-white p-4 rounded-md">
                  <Spinner />
                </div>
              )}
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4 w-full text-lg text-white my-4">
                {previousPage && (
                  <button onClick={handlePrev} className={paginationStyles}>
                    Prev
                    <GrFormPrevious /> {previousPage.previousPage}{" "}
                  </button>
                )}
                {nextPage ? (
                  <button className={paginationStyles}>
                    {" "}
                    Current - {nextPage.nextPage - 1}
                  </button>
                ) : (
                  <button className={paginationStyles}>
                    {" "}
                    Current - {previousPage && previousPage.previousPage + 1}
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
              <AddFlight />
              <button
                onClick={() => {
                  navigate("/user-bookings");
                }}
                className="px-4 py-2 ml-4 rounded-md text-blue-950 bg-white my-4 whitespace-nowrap "
              >
                User bookings
              </button>
              {resetResults && (
                <button
                  onClick={reset}
                  className="flex items-center bg-white px-5 ml-4 py-2 rounded-md text-lg text-blue-950"
                >
                  {" "}
                  Reset{" "}
                </button>
              )}
            </div>
          </div>
        </div>
      }
      <Outlet />
    </>
  );
};
export default Home;
