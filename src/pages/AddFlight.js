"use client";
import axios from "axios";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function AddFlight() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [flightName, setFlightName] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [stops, setStops] = useState("");
  const [vacantSeats, setVacantSeats] = useState("");
  const [bookedSeats, setBookedSeats] = useState("");
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState("economy");

  const labelStyles = "font-md text-blue-950";
  const inputStyles = "font-md text-blue-950 focus:outline-none mb-4";
  const divStyles = "mb-1 block";
  function onCloseModal() {
    setOpenModal(false);
    navigate("/");
  }

  const handleFlightName = (e) => {
    setFlightName(e.target.value);
  };

  const handleFlightNumber = (e) => {
    setFlightNumber(e.target.value);
  };

  const handleStops = (e) => {
    setStops(e.target.value);
  };

  const handleVacantSeats = (e) => {
    setVacantSeats(e.target.value);
  };

  const handleBookedSeats = (e) => {
    setBookedSeats(e.target.value);
  };

  const addFlight = async (e) => {
    e.preventDefault();
    const stopsArray = stops.split(",");
    const vacantSeatsArray = vacantSeats.split(",");
    const bookedSeatsArray = bookedSeats.split(",");
    try {
      const response = await axios.post("http://localhost:3001/flight", {
        planeType: flightName,
        airplaneNumber: flightNumber,
        class: selectedOption,
        stops: stopsArray,
        vacantSeats: vacantSeatsArray,
        bookedSeats: bookedSeatsArray,
      });
      setBookedSeats("");
      setSelectedOption("economy");
      setFlightName("");
      setStops("");
      setFlightNumber("");
      setVacantSeats("");
      setError(null);
      alert("Flight Added Successfully");
    } catch (err) {
      setError(err.response.data);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <button
        onClick={() => {
          setOpenModal(true);
          navigate("/add-flight");
        }}
        className="px-4 py-2 rounded-md text-blue-950 bg-white my-4 whitespace-nowrap"
      >
        Add Flight
      </button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-4">
            <h3 className="text-xl font-lg text-blue-950 dark:text-white">
              Add a new flight record
            </h3>
            <form onSubmit={addFlight}>
              <div>
                <div className={divStyles}>
                  <Label
                    htmlFor="flightName"
                    value="Flight Name"
                    className={labelStyles}
                  />
                </div>
                <TextInput
                  id="flightName"
                  placeholder="Flight Name"
                  className={inputStyles}
                  value={flightName}
                  onChange={handleFlightName}
                  required
                />
              </div>
              <div>
                <div className={divStyles}>
                  <Label htmlFor="flight Number" value="Flight Number" />
                </div>
                <TextInput
                  id="flight Number"
                  placeholder="Flight Number"
                  className={inputStyles}
                  value={flightNumber}
                  onChange={handleFlightNumber}
                  required
                />
              </div>
              <div>
                <div className={divStyles}>
                  <Label htmlFor="stops" value="Flight Stops" />
                </div>
                <TextInput
                  id="stops"
                  placeholder="Stops Names separated by commas"
                  className={inputStyles}
                  value={stops}
                  onChange={handleStops}
                  required
                />
              </div>
              <div>
                <div className={divStyles}>
                  <Label htmlFor="vacantSeats" value="Vacant Seats" />
                </div>
                <TextInput
                  id="vacantSeats"
                  placeholder="Vacant Seats separated by commas"
                  className={inputStyles}
                  value={vacantSeats}
                  onChange={handleVacantSeats}
                  required
                />
              </div>
              <div>
                <div className={divStyles}>
                  <Label htmlFor="bookedSeats" value="Booked Seats" />
                </div>
                <TextInput
                  id="bookedSeats"
                  placeholder="Booked Seats separated by commas"
                  className={inputStyles}
                  onChange={handleBookedSeats}
                  required
                />
              </div>
              <div>
                <div className="block">
                  <Label value="Class Type" />
                </div>
                <label>
                  <input
                    type="radio"
                    value="economy"
                    checked={selectedOption === "economy"}
                    onChange={handleOptionChange}
                    className="mr-2 my-4 color-blue-950 "
                  />
                  economy
                </label>

                <label>
                  <input
                    type="radio"
                    value="business"
                    checked={selectedOption === "business"}
                    onChange={handleOptionChange}
                    className="mx-2 my-4"
                  />
                  business
                </label>
              </div>
              <button className="px-4 py-2 mt-2 rounded-md text-white bg-blue-950">
                Add Flight
              </button>

              {error && <p className="mt-4 text-red-500 text-md">{error}</p>}
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default AddFlight;
