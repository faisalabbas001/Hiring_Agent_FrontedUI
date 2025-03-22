import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const API_BASE_URL = "http://0.0.0.0:8001";

const HiringControlPanel: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleStart = async (): Promise<void> => {
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/start`);
      setIsRunning(true);
    } catch (error) {
      console.error("Error starting agent:", error);
    }
    setLoading(false);
  };

  const handleStop = async (): Promise<void> => {
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/stop`);
      setIsRunning(false);
    } catch (error) {
      console.error("Error stopping agent:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-700 w-[350px]">
        <h2 className="text-center text-xl font-bold text-white mb-6">
          HIRING AGENT CONTROL PANEL
        </h2>
        <div className="flex flex-col space-y-6">
          {/* Start Button */}
          <motion.button
            onClick={handleStart}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            className={`w-full px-6 py-4 rounded-lg text-lg font-semibold shadow-md transition duration-300 ${
              isRunning || loading
                ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                : "bg-green-500 text-white"
            }`}
            disabled={isRunning || loading}
          >
            {loading && !isRunning ? "Starting..." : isRunning ? "Running..." : "Start Agent"}
          </motion.button>

          {/* Stop Button */}
          <motion.button
            onClick={handleStop}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            className={`w-full px-6 py-4 rounded-lg text-lg font-semibold shadow-md transition duration-300 ${
              !isRunning || loading
                ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                : "bg-red-500 text-white"
            }`}
            disabled={!isRunning || loading}
          >
            {loading && isRunning ? "Stopping..." : isRunning ? "Stop Agent" : "Stopped"}
          </motion.button>
        </div>

        {/* Status Indicator */}
        <div className="mt-6 flex justify-center">
          <span
            className={`w-4 h-4 rounded-full ${
              isRunning ? "bg-green-500 animate-pulse" : "bg-red-500"
            }`}
          ></span>
          <p className="ml-3 text-white text-sm">
            {isRunning ? "Agent is Running..." : "Agent is Stopped"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HiringControlPanel;
