import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { AppShell, Card, Container, Image, Text, Badge, Button, Group, Space } from '@mantine/core';
import AllLinks from '../../components/AllLinks';
import { useDisclosure } from '@mantine/hooks';

import { SimpleGrid } from '@mantine/core';

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
    }, [isAuthenticated, user]);

    const colors = ['red', 'violet', 'indigo', 'yellow', 'teal'];


    return (
        !isAuthenticated ?
            <p>Please return home and log in</p> :
            isLoading ? "Loading" :
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
                        <Text size="xl" c="blue" fw={700}>Welcome, {user.name.split(" ")[0]} </Text>
                        <AllLinks />
                        <Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</Button>
                    </AppShell.Navbar>
                    <AppShell.Main>
                        <Text size="xl" c='teal'>Your Workout History</Text>
                        {data?.items?.length < 1 && <Text>You do not have any workouts yet</Text>}
                        <Container mt={80} size="80rem" >
                            <SimpleGrid cols={3} spacing="xl">
                                {data?.items?.map(item => {
                                    console.log(item)
                                    return (<Card shadow="sm" padding="lg" radius="md" withBorder>
                                        <Card.Section>
                                            {item.date}
                                        </Card.Section>

                                        <Group justify="space-between" mt="md" mb="xs">
                                            <Text fw={700}>{item.workout.match(/<h1>(.*?)<\/h1>/)[1]}</Text>
                                            {item.themes.map((theme, index) => {
                                                const badgeColor = colors[index % colors.length]; // Cycle through colors
                                                return <><Badge color={badgeColor} key={index}>{theme}</Badge> </>;
                                            })}
                                        </Group>
                                        <Text size="sm" c="dimmed">
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: item.workout.replace(/<h1>.*?<\/h1>/, '')
                                                }}
                                            />

                                        </Text>

                                        <Button color="blue" fullWidth mt="md" radius="md">
                                            Book classic tour now
                                        </Button>
                                    </Card>)
                                })}
                            </SimpleGrid>
                        </Container>
                    </AppShell.Main>
                </AppShell>
    )

}

export default LogHistoryPage;
