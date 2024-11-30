import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { AppShell, Card, Container, Image, Text, Title, Badge, Button, Group, Space } from '@mantine/core';
import AllLinks from '../../components/AllLinks';
import { useDisclosure } from '@mantine/hooks';
import { SimpleGrid } from '@mantine/core';
import { renderThemeBadges } from '../../utils/helpers';
import HomePageUnAuth from '../HomePage/HomePageUnAuth';
import LoadingPage from '../LoadingPage/LoadingPage'

const LogHistoryPage = () => {


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

    useEffect(() => {
        // Ensure the user is authenticated before making the request
        if (isAuthenticated && user.email) {
            setLoading(true)
            axios.get('https://s189gjihg5.execute-api.us-west-2.amazonaws.com', {
                params: { 'user': JSON.stringify(user), },
                headers: {
                    'user': JSON.stringify(user),  // Add your custom header here
                },
                body: { 'body': "body1" }
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
    }, [isAuthenticated, user]);

    if (isLoading || loading) {
        return <LoadingPage />
    }


    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Navbar p="md">
                {isAuthenticated && <Text size="xl" c="blue" fw={700}>Welcome, {user.name.split(" ")[0]} </Text>}
                <AllLinks isAuthed={isAuthenticated} />
                {isAuthenticated && <Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</Button>}
            </AppShell.Navbar>
            {!isAuthenticated ?
                <HomePageUnAuth /> :
                isLoading ? "Loading" :

                    <AppShell.Main>
                        <Title c='#5474B4'>Your Workout History</Title>
                        {data?.items?.length < 1 && <Text>You do not have any workouts yet</Text>}
                        <Container mt={80} size="80rem" >
                            <SimpleGrid cols={1} spacing="xl">
                                {data?.items?.map(item => {

                                    return (<Card shadow="m" padding="lg" radius="md" withBorder>
                                        <Card.Section>
                                            <div style={{ display: 'flex', padding: '1rem', justifyContent: 'flex-end' }}>
                                                <Text size="m" c="dimmed" > {item.date}</Text>
                                            </div>
                                        </Card.Section>

                                        <Group justify="space-between" mt="md" mb="xs">
                                            <Title>{item.workout.match(/<h1>(.*?)<\/h1>/)[1]}</Title>
                                        </Group>
                                        <Group>

                                            {renderThemeBadges(item.themes)}

                                        </Group>
                                        <Text size="sm" c="dimmed">
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: item.workout.replace(/<h1>.*?<\/h1>/, '')
                                                }}
                                            />

                                        </Text>

                                        <Button color="blue" fullWidth mt="md" radius="md">
                                            Ignore this button for now (Talking to you Colin)
                                        </Button>
                                    </Card>)
                                })}
                            </SimpleGrid>
                        </Container>
                    </AppShell.Main>
            }
        </AppShell>
    )

}

export default LogHistoryPage;
