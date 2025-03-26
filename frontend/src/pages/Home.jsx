import React, { useState } from "react";
import logo from "../assets/1659761100uber-logo-png.png";
import bimg from "../assets/uber-challenge.jpg";
// duration 4.08.00
const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Logo */}
      <img
        className="w-16 absolute left-5 top-5 z-10"
        src={logo}
        alt="Uber Logo"
      />

      {/* Background Image Section (Centered Image) */}
      <div className="w-full h-[65vh] flex justify-center items-center bg-gray-100">
        <img
          className="max-w-full max-h-full object-contain"
          src={bimg}
          alt="Background"
        />
      </div>

      {/* Trip Search Form */}
      <div className="flex flex-col items-center justify-center h-[35vh] bg-white p-6 shadow-lg w-full relative">
        <h4 className="text-lg font-semibold mb-3">Find a Trip</h4>
        <form
          className="w-80"
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <div className="line absolute h-16 w-1 top-[45%] left-152 bg-gray-900 rounded-full"></div>
          <input
          onClick={() => {
            setPanelOpen(true)
          }}
            value={pickup}
            onChange={(e)=> {
              setPickup(e.target.value)
            }}
            type="text"
            placeholder="Add a pick-up location"
            className="w-full p-2 mb-3 border border-gray-300 rounded"
          />
          <input
          onClick={() => {
            setPanelOpen(true)
          }}
             value={destination}
             onChange={(e)=> {
               setDestination(e.target.value)
             }}
            type="text"
            placeholder="Enter your destination"
            className="w-full p-2 mb-3 border border-gray-300 rounded"
          />
        </form>
      </div>
      <div className="bg-red-50 h-0"></div>
    </div>
  );
};

export default Home;
