import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlayerPdf from "./components/playerPdf";
import PlayerCarousel from "./components/PlayerGrid";

function App() {
  return (
    <Router>
      <div
        className="gradient-bsg flex min-h-screen items-center justify-center p-4"
        style={{
          backgroundImage: "url('/bg.jpg')",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 xl:w-1/3 transform rounded-lg bg-white p-4 sm:p-6 md:p-8 shadow-lg transition duration-500 hover:scale-105">
          <Routes>
            <Route path="/" element={<PlayerCarousel />} />
            <Route path="/pdf" element={<PlayerPdf />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
