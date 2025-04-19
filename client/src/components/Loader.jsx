import React from "react";
const Loader = () => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FAF9F6]">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-blue-400 border-t-transparent animate-spin"></div>
          <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center shadow-inner">
            <span className="text-blue-500 font-semibold">Loading</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default Loader;