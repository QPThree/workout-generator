import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your actual API URL
    axios.get('https://uz45ft8e8h.execute-api.us-west-2.amazonaws.com')
      .then(response => {
        setData(response.data);  // Store the response data
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);  // Handle any errors
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>{data}</h1>
      {/* TODO: Delete me */}
      <h1>30-Minute Workout</h1>
  <p>Here's a 30-minute workout incorporating box jumps and double unders. Make sure to warm up properly before starting!</p>
  
  <h2>Warm-up (5 minutes):</h2>
  <ul>
    <li>Light jogging/jumping jacks (2 min)</li>
    <li>10 arm circles (forward and backward)</li>
    <li>10 leg swings (each leg)</li>
    <li>10 bodyweight squats</li>
    <li>Practice a few box jumps and double unders at lower intensity</li>
  </ul>

  <h2>Workout (20 minutes):</h2>
  <p>Complete 5 rounds of:</p>
  <ul>
    <li>10 box jumps (use appropriate box height - start conservative)</li>
    <li>30 double unders</li>
    <li>15 push-ups</li>
    <li>20 air squats</li>
  </ul>
  <p>Rest 1 minute between rounds.</p>

  <h3>If double unders are too challenging, substitute with:</h3>
  <ul>
    <li>90 single unders</li>
    <li>OR 45 single unders + 15 attempted double unders</li>
  </ul>
    </div>
  );
}

export default App;
