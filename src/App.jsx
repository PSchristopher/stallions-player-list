import React from "react";
import PlayerCarousel from "./components/PlayerGrid";

function App() {
  return (
    <div
      className="gradient-bsg flex min-h-screen items-center justify-center p-4"
      style={{
        backgroundImage: "url('/bg.jpg')",
        // backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 xl:w-1/3 transform rounded-lg bg-white p-4 sm:p-6 md:p-8 shadow-lg transition duration-500 hover:scale-105">
        <PlayerCarousel />
      </div>
    </div>
  );
}

export default App;


{/* <img src="https://drive.google.com/thumbnail?id=1d5hwi9cmxqs3PgmOml5wyjh1Hrc-iIev" alt="" /> */}