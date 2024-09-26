import React from "react";
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

function App(): JSX.Element {
  const { data, error, isLoading } = useSWR("http://localhost:5001/status", fetcher);
  
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center mx-auto px-4">
      <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-red-500">
        Hello World
      </h1>
      <p className="text-gray-500 font-medium">
        This is a basic setup with Tailwind CSS!
        <br></br>
        {JSON.stringify(data)}
      </p>
    </div>
  );
}

export default App;
