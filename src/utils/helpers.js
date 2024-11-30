import { AppShell, Card, Container, Image, Text, Badge, Button, Group, Stack } from '@mantine/core';

export const renderThemeBadges = (themes) => {
    const themeColorMap = {
        'strength': 'red',
        'endurance': 'green',
        'cardio': 'green',
        'conditioning': 'green',
        'bodyweight': 'yellow',
        'skill': 'yellow',
        'gymnastics': 'blue',
        'power': 'purple',
        'full-body': 'red'
    };
    const defaultColor = 'grey'
    return (
        <Stack
            h={300}
            bg="var(--mantine-color-body)"
            align="stretch"
            justify="center"
            gap="md"
        >
            {themes?.map((theme, index) => {
                // Use the predefined color for a theme if it exists, otherwise use the default color
                const badgeColor = themeColorMap[theme] || defaultColor;
                return <Badge color={badgeColor} key={index}>{theme}</Badge>

            })}
        </Stack>
    )

};