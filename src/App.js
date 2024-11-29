import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { AppShell, Badge, Button, Burger, Space, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import HomePageUnAuth from './Pages/HomePage/HomePageUnAuth'


function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [opened, { toggle }] = useDisclosure();

  const {
    logout,
    user,
    isAuthenticated,
    isLoading,
  } = useAuth0();

  const fakeData = {
    timeFrame: '30',
    movements: ['deadlift', 'pushups', 'double-unders'],
    focus: 'strength'

  };
  const colors = ['red', 'violet', 'indigo', 'yellow', 'teal'];
  useEffect(() => {
    // Ensure the user is authenticated before making the request
    if (isAuthenticated && user.email) {
      setLoading(true)
      axios.get('https://uz45ft8e8h.execute-api.us-west-2.amazonaws.com',  {
        params: fakeData,
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

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    !isAuthenticated ? (
      <HomePageUnAuth />
    ) : (
    <div>
         <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
      <Burger
          lineSize={2} 
          size="xl"
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
        />
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Text size="xl" c="blue" fw={700}>Welcome, {user.name.split(" ")[0]} </Text>
        <div>Past Workouts</div>
      <Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</Button>
       </AppShell.Navbar>
      <AppShell.Main>
        {loading? <div>Loading...</div>: 
      <>
      <h1>Today's WOD</h1>
      {data?.themes.map((theme, index) => {
        const badgeColor = colors[index % colors.length]; // Cycle through colors
        return <Badge color={badgeColor} key={index}>{theme}</Badge>;
      })}
      <Space h="md" />
      <div dangerouslySetInnerHTML={{ __html: data?.workout }} />
      </>
        }
      </AppShell.Main>
      </AppShell>
    </div>
    ));
}

export default App;
