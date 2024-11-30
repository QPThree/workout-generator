import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { AppShell, Badge, Button, Center, Grid, Loader, Group, Radio, Stack, Select, Space, Text, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import HomePageUnAuth from './Pages/HomePage/HomePageUnAuth'
import HomePageAuth from './Pages/HomePage/HomePageAuth';
import AllLinks from './components/AllLinks';
import Header from './components/Header';


function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [opened, { toggle }] = useDisclosure();
  const [timeDomain, setTimeDomain] = useState()
  const [selectedValues, setSelectedValues] = useState({
  })

  const {
    logout,
    user,
    isAuthenticated,
    isLoading,
  } = useAuth0();


  const colors = ['red', 'violet', 'indigo', 'yellow', 'teal'];
  useEffect(() => {
    // Ensure the user is authenticated before making the request
    if (isAuthenticated && user.email) {
      setLoading(true)
      axios.get('https://uz45ft8e8h.execute-api.us-west-2.amazonaws.com', {
        params: {},
        headers: {
          'user': JSON.stringify(user),  // Add your custom header here
        }
      })
        .then(response => {
          console.log(response)
          setData(response.data);  // Store the response data
          setLoading(false);
        })
        .catch(error => {
          setError(error.message);  // Handle any errors
          setLoading(false);
        });
    }
  }, [isAuthenticated, user]); // Add dependencies for re-running effect when they change

  // Handle the change for each Select
  const handleSelectChange = (fieldName) => (value) => {
    setSelectedValues((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));

  };

  // Send the selected values to the backend
  const handleSubmit = () => {
    // Send selectedValues as a list or in the format expected by the backend

    setLoading(true)
    const valuesToSend = selectedValues
    valuesToSend['timeDomain'] = timeDomain
    axios.get('https://uz45ft8e8h.execute-api.us-west-2.amazonaws.com', {
      params: valuesToSend,
      headers: {
        'user': JSON.stringify(user),  // Add your custom header here
      }
    })
      .then(response => {
        console.log(response)
        setData(response.data);  // Store the response data
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);  // Handle any errors
        setLoading(false);
      });
  };

  if (isLoading) {
    return <Center maw={1480} h={100} ><Loader color="red" /></Center>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (

    !isAuthenticated ? (
      <HomePageUnAuth />
    ) : (
      <HomePageAuth />)
  )




}

export default App;
