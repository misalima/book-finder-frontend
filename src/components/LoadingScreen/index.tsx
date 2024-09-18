import React from "react";

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-white text-center">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-white h-24 w-24 mb-4"></div>
        <h2 className="text-2xl font-semibold">Loading...</h2>
      </div>
    </div>
  );
};

export default LoadingScreen;
