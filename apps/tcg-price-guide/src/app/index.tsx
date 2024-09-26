import React from "react";
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

function App(): JSX.Element {
  const { data, error, isLoading } = useSWR("http://localhost:5001/v1/health/ready", fetcher);
  
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <div>
        {JSON.stringify(data)}
    </div>
  );
}

export default App;
