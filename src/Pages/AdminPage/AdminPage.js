import React, { useState, useEffect } from 'react';
import { AppShell, Text, Button, Title, Progress, Space } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingPage from '../LoadingPage/LoadingPage';
import NavBar from '../../components/NavBar'
import HomePageUnAuth from '../HomePage/HomePageUnAuth';
import axios from 'axios';
import Header from '../../components/Header';

const AdminPage = () => {
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
            axios.get('https://mud0me8ro8.execute-api.us-west-2.amazonaws.com ', {
                // params: { 'user': JSON.stringify(user), },
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
            <Header />
            <NavBar />
            {!isAuthenticated ?
                <HomePageUnAuth /> :
                isLoading ? <LoadingPage /> :

                    <AppShell.Main>
                        <Title c='#5474B4'>Admin Page</Title>
                        {data &&
                            <>
                                <Text>Total Workouts Generated: {data.total_items}</Text>
                                <Progress color="yellow" value={data.total_items} />
                                <Space h='m' />
                                <Text c='black'>Total Unique Users: {data.unique_partition_keys}</Text>

                                <Progress color="teal" value={data.unique_partition_keys} />
                            </>
                        }

                    </AppShell.Main>
            }
        </AppShell>
    )

}

export default AdminPage;
