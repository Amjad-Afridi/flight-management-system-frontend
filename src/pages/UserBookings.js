"use client";
import { Table } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from "react-redux";
const UserBookings = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const getUserBookings = async () => {
    try {
      const response = await axios.get("http://localhost:3001/user-booking", {
        params: user,
      });
      console.log("user bookings : ", response.data);
      setData(response.data);
    } catch (err) {
      console.log(err.message);
      setError(err.response.data);
    }
  };
  useEffect(() => {
    getUserBookings();
  }, []);
  return (
    <>
      <div className="bg-blue-950 w-full h-[100vh] py-16">
        <h1 className="flex justify-center bg-blue-950 my-8 p-4 text-white text-4xl rounded-md ">
          User's Booked Flights
        </h1>
        <Table hoverable className="m-auto w-[80%] ">
          <Table.Head className="text-lg border-b-[2px] border-black ">
            <Table.HeadCell>User</Table.HeadCell>
            <Table.HeadCell>Flight name</Table.HeadCell>
            <Table.HeadCell>Flight Number</Table.HeadCell>
            <Table.HeadCell>Class Type</Table.HeadCell>
            <Table.HeadCell>Booked Seats</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {data ? (
              data.map((userDetails) => {
                return (
                  <>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {userDetails.user.username}
                      </Table.Cell>
                      <Table.Cell>{userDetails.data.planeType}</Table.Cell>
                      <Table.Cell>{userDetails.data.airplaneNumber}</Table.Cell>
                      <Table.Cell>{userDetails.data.class}</Table.Cell>
                      <Table.Cell>
                        {userDetails.userBookedSeats.map(
                          (seat) => seat + " / ",
                        )}
                      </Table.Cell>
                    </Table.Row>
                  </>
                );
              })
            ) : (
              <p className="w-fit text-blue-950 text-lg mt-4 bg-white p-4 rounded-md">
                loading
              </p>
            )}
          </Table.Body>
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="px-4 py-2 rounded-md text-blue-950 bg-white my-4 whitespace-nowrap"
          >
            <BiArrowBack size={20} />
          </button>
        </Table>
        <div>
          {error && <p className="text-red-500 text-md py-4"> {error} </p>}
        </div>
      </div>
    </>
  );
};
export default UserBookings;
