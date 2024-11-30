import React, { useState, useEffect } from 'react';
import { AppShell, Button, Card, Grid, Center, Text, Title, Space, Stack, Container } from '@mantine/core';
import { useAuth0 } from '@auth0/auth0-react';
import { IconBarbell } from '@tabler/icons-react'

const HomePageUnAuth = () => {
  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    isLoading,
  } = useAuth0();

  const firstContainerProps = {
    bg: 'var(--mantine-color-blue-light)',
    h: '70vh',
    mt: 'md',
    // px: "20px"
  };

  const secondContainerProps = {
    bg: 'var(--mantine-color-blue-light)',
    h: '70vh',
    mt: 'md',
  };

  return (

    <div className="unauth-homepage">


      <Container size="md" {...firstContainerProps}>
        <Center>
          <Stack
            h={500}
            align="stretch"
            justify="center"
            gap="md"
          >
            <Title><Text span c="blue" inherit>Welcome to Colin's Lazy Generator.</Text></Title>
            <Space h="md" />
            <Space h="md" />
            <Grid>
              <Grid.Col span={4}>
                <IconBarbell size={120} />
              </Grid.Col>
              <Grid.Col span={8}>
                <Text fw={500}>
                  Because we're all just so tired of trying to find good workotuts. Generate an infinite number of workouts with the movements of your choosing. Track your workouts in the workout logger.
                </Text>
              </Grid.Col>
            </Grid>



            <Space w="sm" />



            <Space h="md" />

            <Button onClick={() => loginWithRedirect()}>Log In</Button>
          </Stack>
        </Center>

      </Container>


      <Container size="md" {...secondContainerProps}>

        <Title>Feaatures</Title>
        <Card>Feat 1</Card>
        <Space h="md" />
        <Card>Feat 2</Card>
        <Space h="md" />


        <Card>Feat 3</Card>
      </Container>
      <Text>
        I use a 3rd party authentication library. I will only see / access your name and email so we can track your workouts. Enjoy!
      </Text>

      <footer>
        <p>© 2024 My App. All Rights Reserved.</p>
      </footer>
    </div >
  );
};

export default HomePageUnAuth;
