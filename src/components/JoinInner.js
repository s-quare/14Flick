"use client";

import { showToast } from "@/lib/toast";
import { useState } from "react";

const JoinInner = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      showToast("Awaiting subscribe function:", email);
    }, 1000);
  };

  return (
    <div className="bg-yellow-500 text-black text-center py-12 md:py-20 px-4">
      <h1 className="font-black mb-5 md:mb-10 text-2xl sm:text-4xl">
        JOIN THE INNER CIRCLE
      </h1>
      <p className="text-xs font- max-w-100 mx-auto text-gray-900">
        Get exclusive trailers,industry news, and personalized recommendations
        sent to your inbox weekly
      </p>
      <form onSubmit={handleSubmit}>
        <div className="w-[90%] max-w-89 mx-auto mt-10 grid grid-cols-[1fr_auto]">
          <input
            placeholder="Enter your email address"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-black w-full text-base px-3 py-1.5 bg-white"
          />
          <button className="bg-black px-3 text-xs text-white font-bold">
            Subscribe
          </button>
        </div>
      </form>
    </div>
  );
};

export default JoinInner;
