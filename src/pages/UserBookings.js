"use client";
import { Spinner, Table } from "flowbite-react";
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
      <div className="bg-background-image bg-cover bg-center w-full h-[100vh] py-16">
        <div className="w-[70%] mx-auto bg-white rounded-lg">
          <h1 className="bg-blue-950 text-white p-8 text-center text-4xl rounded-lg">
            User's Booked Flight details
          </h1>
          <Table hoverable className="w-full my-8">
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
                        <Table.Cell>
                          {userDetails.data.airplaneNumber}
                        </Table.Cell>
                        <Table.Cell>{userDetails.data.class}</Table.Cell>
                        <Table.Cell>
                          {userDetails.userBookedSeats.map((seat, index) => {
                            if (
                              index ===
                              userDetails.userBookedSeats.length - 1
                            )
                              return seat;
                            else return seat + " / ";
                          })}
                        </Table.Cell>
                      </Table.Row>
                    </>
                  );
                })
              ) : (
                <div className="flex mt-4 bg-white p-4 rounded-md">
                  <Spinner />
                </div>
              )}
            </Table.Body>
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="px-4 py-2 rounded-md bg-blue-950 text-white m-4 whitespace-nowrap"
            >
              <BiArrowBack size={20} />
            </button>
          </Table>
          <div>
            {error && <p className="text-red-500 text-md py-4"> {error} </p>}
          </div>
        </div>
      </div>
    </>
  );
};
export default UserBookings;
