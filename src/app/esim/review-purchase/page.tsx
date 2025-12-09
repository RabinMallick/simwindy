"use client";

import Image from "next/image";
import { useState } from "react";

export default function ReviewAndPurchase()  {
  const [numSim, setNumSim] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const country = { name: "Bangladesh", flag: "/path/to/bd-flag.png" }; // Replace with actual flag path
  const packageDetails = {
    coverage: country.name,
    data: "1 GB",
    validity: "3 days",
    price: 3,
  };

  const handleIncrement = () => setNumSim((prev) => prev + 1);
  const handleDecrement = () => setNumSim((prev) => Math.max(1, prev));

  const totalPrice = packageDetails.price * numSim;

  return (
    <div className="max-w-md mx-auto p-4 bg-[#f9f2e7] min-h-screen">
      <h2 className="text-center font-semibold mb-4">Review and Purchase</h2>

      {/* Country */}
      <div className="flex items-center gap-2 mb-4 p-2 bg-white rounded-md">
        <Image src={country.flag} alt={country.name} width={100} height={100} className="w-6 h-4 rounded" />
        <span>{country.name}</span>
      </div>

      {/* Number of Sim Cards */}
      <div className="flex items-center gap-2 mb-4">
        <span>Number of Sim Cards</span>
        <div className="flex items-center border rounded-md ml-auto">
          <button
            onClick={handleDecrement}
            className="px-2 py-1 text-lg font-bold"
          >
            -
          </button>
          <span className="px-4">{numSim}</span>
          <button
            onClick={handleIncrement}
            className="px-2 py-1 text-lg font-bold"
          >
            +
          </button>
        </div>
      </div>

      {/* Package */}
      <div className="mb-4 p-4 bg-white rounded-md space-y-2">
        <div className="flex justify-between">
          <span className="flex items-center gap-1">Coverage</span>
          <span>{packageDetails.coverage}</span>
        </div>
        <div className="flex justify-between">
          <span>Data</span>
          <span>{packageDetails.data}</span>
        </div>
        <div className="flex justify-between">
          <span>Validity</span>
          <span>{packageDetails.validity}</span>
        </div>
        <div className="flex justify-between">
          <span>Price</span>
          <span>{packageDetails.price} USD</span>
        </div>
      </div>

      {/* Billing Information */}
      <div className="mb-4 p-4 bg-white rounded-md space-y-2">
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
        <div className="flex gap-2">
          <select className="p-2 border rounded-md">
            <option value="+880">+880</option>
          </select>
          <input
            type="tel"
            placeholder="Enter mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 p-2 border rounded-md"
          />
        </div>
      </div>

      {/* Order Summary */}
      <div className="mb-4 p-4 bg-white rounded-md flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image src={country.flag} alt={country.name} width={100} height={100} className="w-6 h-4 rounded" />
          <span>
            {packageDetails.data} - {packageDetails.validity}
          </span>
          <span>x{numSim}</span>
        </div>
        <span>{totalPrice.toFixed(2)} USD</span>
      </div>

      <p className="text-xs text-gray-500 mb-4">
        By continuing to payment agree to our{" "}
        <span className="underline">Terms and Conditions</span> and{" "}
        <span className="underline">Privacy policy</span>
      </p>

      {/* Next Payment Button */}
      <button className="w-full bg-orange-500 text-white py-3 rounded-md font-semibold">
        Next to Payment
      </button>
    </div>
  );
};
