import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { AppShell, Badge, Button, Center, Grid, Loader, Group, Radio, Stack, Select, Space, Text, Title, TypographyStylesProvider, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { renderThemeBadges } from '../../utils/helpers'
import ErrorPage from '../ErrorPage/ErrorPage'
import { Tabs, rem } from '@mantine/core';
import { IconPhoto, IconAdjustments, IconClockBolt, IconExclamationMark } from '@tabler/icons-react';



function HomePageAuth() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [opened, { toggle }] = useDisclosure();
    const [timeDomain, setTimeDomain] = useState()
    const [selectedValues, setSelectedValues] = useState({
    })
    const iconStyle = { width: rem(12), height: rem(12) };
    const icon = <IconPhoto size={14} />;

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
    }, [user]); // Add dependencies for re-running effect when they change

    // Handle the change for each Select
    const handleSelectChange = (fieldName) => (value) => {
        setSelectedValues((prevState) => ({
            ...prevState,
            [fieldName]: value,
        }));

    };

    // Send the selected values to the backend
    const handleSubmit = async () => {
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

    const generateQuickWorkout = (variant) => {
        if (isAuthenticated && user.email) {
            setLoading(true)
            axios.get('https://z38nj2ofpe.execute-api.us-west-2.amazonaws.com', {
                params: {},
                headers: {
                    'user': JSON.stringify(user),  // Add your custom header here
                    'variant': variant,
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
    }

    if (error) {
        return <ErrorPage />
    }
    return (
        <>
            {loading ? (
                <Center maw={1480} h={100} >
                    <Loader color="red" />
                    <Space h="md" />
                    <Text c='#e64f57'>Generating workout this may take a moment...</Text>
                </Center>
            ) :
                <>
                    {data?.workout ? <Title>Today's WOD</Title> : <Text c="#c91a25">No workout created. Use options below to generate a desired workout.</Text>}
                    {/* <div style={{ display: "flex" }}> */}
                    {renderThemeBadges(data?.themes)}

                    <TypographyStylesProvider>
                        <div dangerouslySetInnerHTML={{ __html: data?.workout }} />
                    </TypographyStylesProvider>
                    {!data?.workout &&
                        <Tabs defaultValue="custom">
                            <Tabs.List>
                                <Tabs.Tab value="custom" leftSection={<IconAdjustments style={iconStyle} />}>
                                    Custom Workout
                                </Tabs.Tab>
                                <Tabs.Tab value="quick generate" leftSection={<IconClockBolt style={iconStyle} />}>
                                    Quick Create
                                </Tabs.Tab>
                                <Tabs.Tab value="future options" leftSection={<IconExclamationMark style={iconStyle} />}>
                                    Future Options
                                </Tabs.Tab>
                            </Tabs.List>
                            <Tabs.Panel value="custom">
                                <>
                                    <h2>Create New WOD</h2>
                                    <Radio.Group
                                        name="timeDomain"
                                        label="Select your time domain"
                                        description="This is required before submitting"
                                        withAsterisk
                                    >
                                        <Group mt="xs" value={timeDomain} onChange={event => setTimeDomain(event.target.value)}>
                                            <Radio checked={timeDomain === '10'} value="10" label="10" />
                                            <Radio value="30" label="30" />
                                            <Radio checked={timeDomain === '60'} value="60" label="60" />
                                            <Radio value="90" label="90" />
                                        </Group>
                                    </Radio.Group>

                                    <Text>Optional select any of the options below</Text>

                                    <Select
                                        label="Barbell movements"
                                        placeholder="Pick value"
                                        data={['deadlifts', 'back squats', 'cleans', 'front-squats', 'snatches', 'over-head squats', 'front-rack lunges']}
                                        value={selectedValues.Barbell}
                                        onChange={handleSelectChange('Barbell')}
                                    />
                                    <Select
                                        label="Skills"
                                        placeholder="Pick value"
                                        data={['double unders', 'handstand pushups', 'muscle ups', 'handstand walks', 'chest-to-bar pullups']}
                                        value={selectedValues.Skills}
                                        onChange={handleSelectChange('Skills')}
                                    />

                                    <Select
                                        label="Endurance"
                                        placeholder="Pick value"
                                        data={['rowing', 'running', 'erg biking', 'burpees', 'wall balls']}
                                        value={selectedValues.Endurance}
                                        onChange={handleSelectChange('Endurance')}
                                    />
                                    <Space h="md" />
                                    <Button variant="filled" color="teal" onClick={() => handleSubmit()}
                                        disabled={timeDomain ? false : true}>Submit</Button>
                                </>
                            </Tabs.Panel>

                            <Tabs.Panel value="quick generate">
                                <Space h="l" />

                                <Text>Select an option to generate your daily workout</Text>
                                <Space h="xl" />
                                <Button justify="center" fullWidth leftSection={icon} variant="filled" color="yellow" onClick={() => generateQuickWorkout('hotel')}>
                                    Hotel Workout
                                </Button>
                                <Space h="xl" />

                                <Button justify="center" fullWidth leftSection={icon} variant="filled" color="red" onClick={() => generateQuickWorkout('strength')}>
                                    Strength Only
                                </Button>

                                <Button justify="center" fullWidth rightSection={icon} variant="default" mt="md">
                                    Button label
                                </Button>

                                <Button
                                    justify="center"
                                    fullWidth
                                    rightSection={icon}
                                    leftSection={<span />}
                                    variant="default"
                                    mt="md"
                                >
                                    Button label
                                </Button>

                            </Tabs.Panel>

                            <Tabs.Panel value="future options">
                                Settings tab content
                            </Tabs.Panel>
                        </Tabs>}


                </>
            }
        </>
    )
}
export default HomePageAuth;