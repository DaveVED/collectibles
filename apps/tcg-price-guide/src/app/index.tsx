import React from "react";

function App(): JSX.Element {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center mx-auto px-4">
      <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-red-500">
        Hello World
      </h1>
      <p className="text-gray-500 font-medium">
        This is a basic setup with Tailwind CSS!
      </p>
    </div>
  );
}

export default App;
