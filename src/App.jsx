import React from "react";
import PlayerCarousel from "./components/PlayerGrid";

function App() {
  return (
    // <div className="gradient-bg flex min-h-screen items-center justify-center from-blue-500 to-purple-600 p-8"  style={{
    <div className="gradient-bg flex min-h-screen items-center justify-center  "  style={{
    backgroundImage: "url('/bg.jpg')",}}>
      <div className="w-1/3 transform rounded-lg bg-white p-8 shadow-lg transition duration-500 hover:scale-110">

<PlayerCarousel/>
      {/* <img src="https://drive.google.com/thumbnail?id=1d5hwi9cmxqs3PgmOml5wyjh1Hrc-iIev" alt="" /> */}
      </div>
      
    </div>
  );
}

export default App;
