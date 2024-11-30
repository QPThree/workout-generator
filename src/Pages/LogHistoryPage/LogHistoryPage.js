import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { AppShell, Card, Container, Image, Text, Title, Badge, Button, Group, Space } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { SimpleGrid } from '@mantine/core';
import { renderThemeBadges } from '../../utils/helpers';
import HomePageUnAuth from '../HomePage/HomePageUnAuth';
import LoadingPage from '../LoadingPage/LoadingPage'
import NavBar from '../../components/NavBar';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';

const LogHistoryPage = () => {


    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

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

    const handleRedirect = (workoutId) => {
        console.log("Redirecting...");
        navigate(`/viewworkout/${workoutId}`);  // Replace '/new-page' with your target route
    };

    if (isLoading || loading) {
        return <LoadingPage />
    }


    return (
        <>
            {!isAuthenticated ?
                <HomePageUnAuth /> :
                isLoading ? "Loading" :
                    <>
                        <Title c='#5474B4'>Your Workout History</Title>
                        {data?.items?.length < 1 && <Text>You do not have any workouts yet</Text>}
                        {/* <Container mt={80} size="80rem" > */}
                        <SimpleGrid cols={1} spacing="xl">
                            {data?.items?.map(item => {

                                return (<Card shadow="m" padding="md" radius="md" withBorder>
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
                                    {/* <Text size="sm" c="dimmed">
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: item.workout.replace(/<h1>.*?<\/h1>/, '')
                                            }}
                                        />

                                    </Text> */}
                                    <Button color="yellow" variant='outline' fullWidth mt="md" radius="md" onClick={() => handleRedirect(item.date)}>
                                        See full workout
                                    </Button>
                                </Card>)
                            })}
                        </SimpleGrid>
                        {/* </Container> */}
                    </>

            }
        </ >
    )

}

export default LogHistoryPage;
