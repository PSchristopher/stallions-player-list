import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiPhone
} from 'react-icons/fi';
import players from './players';

const PlayerCarousel = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filteredPlayers, setFilteredPlayers] = useState(players);
const [isModalOpen, setIsModalOpen] = useState(false);
const [modalImage, setModalImage] = useState('');
const handleImageClick = (imgUrl) => {
  setModalImage(imgUrl);
  setIsModalOpen(true);
};

  useEffect(() => {
    const filtered = players.filter(player =>
      player.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPlayers(filtered);
    setCurrentIndex(0);
  }, [searchQuery]);

  const getDirectDownloadUrl = useCallback((url) => {
    console.log(url, 'urlurlurl')
    if (!url) return '/default-player.jpg';
    const idMatch =
      url.match(/[?&]id=([a-zA-Z0-9_-]+)/) ||
      url.match(/\/d\/([a-zA-Z0-9_-]+)/);
      // https://drive.google.com/thumbnail?id=1JTfBq-92SE15aIFI73S8objhxRfPeHcP&amp;sz=w1000
    return idMatch
     && `https://drive.google.com/thumbnail?id=${idMatch[1]}`
      // : '/default-player.jpg';
  }, []);

  const goToNextPlayer = (e) => {
    e.preventDefault();
    setCurrentIndex(prev =>
      prev >= filteredPlayers.length - 1 ? 0 : prev + 1
    );
  };

  const goToPrevPlayer = (e) => {
    e.preventDefault();
    setCurrentIndex(prev =>
      prev <= 0 ? filteredPlayers.length - 1 : prev - 1
    );
  };

  const handleDotClick = (e, index) => {
    e.preventDefault();
    setCurrentIndex(index);
  };

  const currentPlayer = filteredPlayers[currentIndex] || {};
  const imageUrl = currentPlayer.photo && getDirectDownloadUrl(currentPlayer.photo);
console.log(imageUrl, 'imageUrlimageUrl')
  return (
    <div className="p-4">
      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search players..."
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredPlayers.length > 0 ? (
        <div className="relative">
          {/* Carousel */}
          <div className="relative h-[30rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex justify-center"
              >
                <div className=" rounded-2xl shadow-xl overflow-hidden w-full max-w-sm">
                  <div className="flex items-center justify-center pt-6 bg-gray-100 relative">
                    <img
                      src={imageUrl}
                      alt={currentPlayer.name}
                      className="w-48 h-48 object-cover rounded-full border-4 border-white shadow-lg"
                     onClick={() => handleImageClick(imageUrl)}
                   />
                  </div>

                  {/* Player Info */}
                  <div className="p-6 text-center h-full flex flex-col gap-4 items-center bg-cyan-600">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      Name: {currentPlayer.name}
                    </h3>
                    <p className="text-white font-medium mb-1">
                      Position: {currentPlayer.playing_Role}
                    </p>
                    <p className="text-white mb-4">
                      Club: {currentPlayer.club}
                    </p>

                    <div className="flex justify-center space-x-4 mb-2 text-white">
                      <div className="flex items-center">
                        <FiPhone className="mr-2" />
                        <span>{currentPlayer.phone_Number}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <AnimatePresence>
  {isModalOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={() => setIsModalOpen(false)} // Close on outside click
    >
      <motion.img
        src={modalImage}
        alt="Full Size"
        className="min-w-60 min-h-min-w-60 rounded-xl shadow-2xl"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking on image
      />
    </motion.div>
  )}
</AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevPlayer}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 z-10 focus:outline-none"
          >
            <FiChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
          <button
            onClick={goToNextPlayer}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 z-10 focus:outline-none"
          >
            <FiChevronRight className="h-6 w-6 text-gray-700" />
          </button>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {filteredPlayers.map((_, index) => (
              <button
                key={index}
                onClick={(e) => handleDotClick(e, index)}
                className={`rounded-full w-3 h-3 transition-colors ${
                  currentIndex === index ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">
            No players found matching "{searchQuery}"
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
};

export default PlayerCarousel;
