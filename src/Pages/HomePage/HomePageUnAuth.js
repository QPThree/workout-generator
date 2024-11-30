import React, { useState, useEffect } from 'react';
import { AppShell, Button, Card, Grid, Center, List, Text, Title, Space, Stack, Container } from '@mantine/core';
import { useAuth0 } from '@auth0/auth0-react';
import { IconBarbell, IconRun, IconTimeDuration30 } from '@tabler/icons-react'

const HomePageUnAuth = () => {
  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    isLoading,
  } = useAuth0();

  const mainContainerProps = {
    bg: 'var(--mantine-color-blue-light)',
    h: '70vh',
    mt: 'md',
    // px: "20px"
  };

  const secondContainerProps = {
    bg: 'var(--mantine-color-blue-light)',
    h: '120vh',
    mt: 'md',
  };

  return (

    <div className="unauth-homepage">

      {/*  - - - - -  MAIN CARD  - - - -  */}
      <Container size="md" {...mainContainerProps}>
        <Center>
          <Stack
            h={600}
            align="stretch"
            justify="center"
            gap="md"
          >
            <Title><Text span c="blue" inherit>Welcome to Colin's Lazy Generator.</Text></Title>
            <Space h="md" />
            <Space h="md" />
            <Grid>
              <Grid.Col span={4}>
                <IconBarbell size={120} stroke={1.5} />
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


      {/* - - - - - -  FEATURE CARDS - - - - - - */}

      <Container size="md" {...secondContainerProps}>
        <Title>Features</Title>
        <Space h="lg" />
        <Card>
          <Card.Section>
            <Center>
              <Text size="xl">Selectable Movements</Text>
            </Center>
          </Card.Section>
          <Space h="sm" />

          <Center>
            <Text>
              Select up to 3 movements or modalities that you would like your workout to incldue. Options include barbell movements (deadlifts, squats, snatches, olympics lifts), endurance modalities (running, rowing, biking), and skill based movements (muscle ups, pull ups, handstand walks, and more)</Text>
          </Center>
          <Center>
            <IconRun size={80} stroke={1.5} />
          </Center>

        </Card>
        <Space h="md" />
        <Card>
          <Card.Section>
            <Center>
              <Text size="xl">Quick Create</Text>
            </Center>
          </Card.Section>
          <Space h="sm" />

          <Center>
            <Text>
              Staying in a hotel? Use the quick create option to generate workout that fits your equipment availability. Want just a quick strength training session? Select our strength training quick create. And more!
            </Text>
          </Center>
          <Center>
            <IconTimeDuration30 size={80} stroke={1.5} />
          </Center>
        </Card>
        <Space h="md" />
        <Card>
          <Card.Section>
            <Center>
              <Text size="xl">
                More features to come! Including:
              </Text>
            </Center>
          </Card.Section>
          <Space h="sm" />
          <Center>
            <Space h="sm" />
            <List>
              <List.Item>Workout types like AMRAP, For Time, EMOMs, Tatbatas</List.Item>
              <List.Item>Injury considerations: Can't do certain movements? Include them in your considerations</List.Item>
              <List.Item>Score inputs</List.Item>
              <List.Item>More...</List.Item>
            </List>
          </Center>
          <Center>
            <IconTimeDuration30 size={80} stroke={1.5} />
          </Center>
        </Card>
      </Container>


      <footer>
        <p>© 2024 Cain Corporated. All Rights Reserved.</p>
      </footer>
    </div >
  );
};

export default HomePageUnAuth;
