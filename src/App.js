import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { AppShell, Badge, Button, Burger, Group, Radio, Select, Space, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import HomePageUnAuth from './Pages/HomePage/HomePageUnAuth'


function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [opened, { toggle }] = useDisclosure();
  const [timeDomain, setTimeDomain] = useState('60')
  const [selectedValues, setSelectedValues] = useState({
  });

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
            {loading ? <div>Loading...</div> :
              <>
                <h1>Today's WOD</h1>
                {data?.themes?.map((theme, index) => {
                  const badgeColor = colors[index % colors.length]; // Cycle through colors
                  return <Badge color={badgeColor} key={index}>{theme}</Badge>;
                })}
                <Space h="md" />
                <div dangerouslySetInnerHTML={{ __html: data?.workout }} />

                {!data?.workout &&
                  <>
                    <h2>Create New WOD</h2>
                    <Radio.Group
                      name="favoriteFramework"
                      label="Select your favorite framework/library"
                      description="This is anonymous"
                      withAsterisk
                    >
                      <Group mt="xs" value={timeDomain ?? '60'} onChange={event => setTimeDomain(event.target.value)}>
                        <Radio value="10" label="10" />
                        <Radio value="30" label="30" />
                        <Radio value="60" label="60" />
                        <Radio value="90" label="90" />
                      </Group>
                    </Radio.Group>

                    <Text>Optional select any of the options below</Text>

                    <Select
                      label="Barbell movements"
                      placeholder="Pick value"
                      data={['Deadlifts', 'Back Squats', 'Cleans', 'Snatches', 'deadlifts']}
                      value={selectedValues.Barbell}
                      onChange={handleSelectChange('Barbell')}
                    />
                    <Select
                      label="Skills"
                      placeholder="Pick value"
                      data={['double unders', 'handstand pushups', 'muscle ups']}
                      value={selectedValues.Skills}
                      onChange={handleSelectChange('Skills')}
                    />

                    <Select
                      label="Endurance"
                      placeholder="Pick value"
                      data={['rowing', 'running', 'erg biking']}
                      value={selectedValues.Endurance}
                      onChange={handleSelectChange('Endurance')}
                    />

                    <Button variant="filled" color="teal" onClick={() => handleSubmit()}>Submit</Button>
                  </>
                }



              </>
            }
          </AppShell.Main>
        </AppShell>
      </div >
    ));
}

export default App;
