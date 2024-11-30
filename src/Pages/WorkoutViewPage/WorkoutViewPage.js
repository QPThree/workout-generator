import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { IconArrowLeftDashed } from '@tabler/icons-react'
import { useAuth0 } from '@auth0/auth0-react';
import LoadingPage from "../LoadingPage/LoadingPage";
import { AppShell, Card, Container, Image, Text, Title, Badge, Button, Group, Space, TypographyStylesProvider } from '@mantine/core';
import { renderThemeBadges } from "../../utils/helpers";



const WorkoutViewPage = () => {

    const { workoutId } = useParams();
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
        if (isAuthenticated && user.email && workoutId) {
            setLoading(true)
            axios.get('https://g6jby5d556.execute-api.us-west-2.amazonaws.com', {
                params: { 'user': JSON.stringify(user), 'workoutId': JSON.stringify(workoutId) },
                headers: {
                    'user': JSON.stringify(user),  // Add your custom header here
                    'workoutId': JSON.stringify(workoutId)
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


    const handleRedirectBackToLogs = () => {
        console.log("Redirecting...");
        navigate(`/workoutlog`);
    }

    if (isLoading || loading) {
        return <LoadingPage />
    }



    return (
        <>
            <Button variant="outline" leftSection={<IconArrowLeftDashed />} onClick={() => handleRedirectBackToLogs()}>Back to Log</Button>
            {
                data?.workout ? <Title>Today's WOD</Title> : <Text c="#c91a25">No workout created. Use options below to generate a desired workout.</Text>}
            {/* <div style={{ display: "flex" }}> */}
            {renderThemeBadges(data?.themes)}

            <TypographyStylesProvider>
                <div dangerouslySetInnerHTML={{ __html: data?.workout }} />
            </TypographyStylesProvider>
        </>
    )
}

export default WorkoutViewPage;