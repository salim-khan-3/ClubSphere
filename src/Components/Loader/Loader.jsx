import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-transparent">
      <div className="relative flex flex-col items-center">
        
        <div className="w-16 h-16 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>

        
        <div className="absolute w-20 h-20 bg-emerald-200 opacity-30 rounded-full animate-ping"></div>

       
        <p className="mt-6 text-emerald-700 font-semibold text-lg tracking-wide animate-pulse">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default Loader;
