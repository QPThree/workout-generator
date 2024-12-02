import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { AppShell, Badge, Button, Center, SegmentedControl, Loader, Group, Radio, MultiSelect, Select, Space, Text, Title, TypographyStylesProvider, Checkbox, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { renderThemeBadges } from '../../utils/helpers'
import ErrorPage from '../ErrorPage/ErrorPage'
import { Tabs, rem } from '@mantine/core';
import { IconAdjustments, IconClockBolt, IconBarbell, IconBuildingSkyscraper, IconWeight, IconGymnastics, IconTreadmill, IconDeviceVisionProFilled } from '@tabler/icons-react';



function HomePageAuth() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [opened, { toggle }] = useDisclosure();
    const [timeDomain, setTimeDomain] = useState()
    const [selectedValues, setSelectedValues] = useState({
    })
    const [engineBuildersValues, setEngineBuildersValues] = useState([]);
    const [barbellMovementsValues, setBarbellMovementsValues] = useState([]);
    const [advancedMovementsValues, setAdvancedMovementsValues] = useState([]);
    const [skillMovementsValues, setSkillMovementsValues] = useState([]);
    const [typeValue, setTypeValue] = useState("Random")
    const iconStyle = { width: rem(12), height: rem(12) };

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
                params: {
                },
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
        valuesToSend['type'] = typeValue;
        valuesToSend['length'] = timeDomain
        valuesToSend['barbellMovementsValues'] = barbellMovementsValues.join(',');
        valuesToSend['advancedMovementsValues'] = advancedMovementsValues.join(',');
        valuesToSend['engineBuildersValues'] = engineBuildersValues.join(',');
        valuesToSend['skillMovementsValues'] = skillMovementsValues.join(',');
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
                    <Loader color="black" />
                    <Space h="md" />
                    <Text c='black'>Generating workout this may take a moment...</Text>
                </Center>
            ) :
                <>
                    {data?.workout && <Title>Today's WOD</Title>}
                    {/* <div style={{ display: "flex" }}> */}
                    {data.workout && renderThemeBadges(data?.themes)}

                    <TypographyStylesProvider>
                        <div dangerouslySetInnerHTML={{ __html: data?.workout }} />
                    </TypographyStylesProvider>
                    {/* This below is the custom create component */}
                    {!data?.workout &&
                        <>
                            <Tabs defaultValue="custom" color="gray" orientation="horizontal" variant="outline">
                                <Tabs.List>
                                    <Tabs.Tab value="custom" leftSection={<IconAdjustments style={iconStyle} />}>
                                        Custom Workout
                                    </Tabs.Tab>
                                    <Tabs.Tab value="quick generate" leftSection={<IconClockBolt style={iconStyle} />}>
                                        Quick Create
                                    </Tabs.Tab>
                                </Tabs.List>
                                <Tabs.Panel value="custom">
                                    <div style={{ padding: '10px' }}>
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
                                            <Space h="sm" />
                                            <SegmentedControl
                                                data={['Random', 'AMRAP', 'Timed', 'EMOM']}
                                                value={typeValue}
                                                onChange={setTypeValue}
                                                fullWidth
                                            />
                                            <Space h="md" />
                                            <MultiSelect
                                                // label="Barbell Movements"
                                                placeholder="Pick value up to 3 Barbell Movements"
                                                checkIconPosition="right"
                                                maxValues={3}
                                                searchable
                                                leftSection={<IconBarbell />}
                                                nothingFoundMessage="Nothing found..."
                                                value={barbellMovementsValues} onChange={setBarbellMovementsValues}
                                                data={['deadlifts', 'back squats', 'cleans', 'front-squats', 'snatches', 'over-head squats', 'front-rack lunges', 'push press']}
                                            />
                                            <Space h="md" />

                                            <MultiSelect
                                                // label="Engine Builders"
                                                placeholder="Pick value up to 3 Engine Builders"
                                                checkIconPosition="right"
                                                leftSection={<IconTreadmill />}
                                                maxValues={3}
                                                searchable
                                                nothingFoundMessage="Nothing found..."
                                                value={engineBuildersValues} onChange={setEngineBuildersValues}
                                                data={['running', 'rowing', 'ski erg', 'burpees', 'wall balls', 'box jumps', 'double-unders']}
                                            />
                                            <Space h="md" />

                                            <MultiSelect
                                                // label="Skill Movements"
                                                placeholder="Pick value up to 3 Skill Movements"
                                                checkIconPosition="right"
                                                leftSection={<IconGymnastics />}

                                                maxValues={3}
                                                searchable
                                                nothingFoundMessage="Nothing found..."
                                                value={skillMovementsValues} onChange={setSkillMovementsValues}
                                                data={['pistol squats', 'chest to bar pullups', 'toes to bar', 'handstand pushups', 'double-unders']}
                                            />
                                            <Space h="md" />

                                            <MultiSelect
                                                // label="Advanced Movements"
                                                value={advancedMovementsValues} onChange={setAdvancedMovementsValues}
                                                maxValues={3}
                                                checkIconPosition="right"
                                                leftSection={<IconDeviceVisionProFilled />}
                                                searchable
                                                nothingFoundMessage="Nothing found..."
                                                placeholder="Pick up to 3 Advanced Movements"
                                                comboboxProps={{ shadow: 'md' }}
                                                data={['bar muscle ups', 'ring muscle ups', 'handstand walks', 'handstand pushups', 'GHD situps']}

                                            />
                                            <Group justify="flex-end" mt="md">
                                                <Button onClick={event => handleSubmit()} disabled={timeDomain ? false : true}> Submit</Button>
                                            </Group>
                                        </>
                                    </div>
                                </Tabs.Panel>
                                <Tabs.Panel value="quick generate">
                                    <Space h="l" />

                                    <Text>Select an option to generate your daily workout</Text>
                                    <Space h="xl" />
                                    <Button justify="center" fullWidth leftSection={<IconBuildingSkyscraper size={14} />} variant="filled" color="yellow" onClick={() => generateQuickWorkout('hotel')}>
                                        Hotel Workout
                                    </Button>
                                    <Space h="xl" />
                                    <Button justify="center" fullWidth leftSection={<IconWeight size={14} />} variant="filled" color="red" onClick={() => generateQuickWorkout('strength')}>
                                        Strength Only
                                    </Button>

                                </Tabs.Panel>
                            </Tabs>
                        </>}


                </>
            }
        </>
    )
}
export default HomePageAuth;