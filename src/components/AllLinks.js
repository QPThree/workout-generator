import { Badge, NavLink } from '@mantine/core';
import { IconHome2, IconLogs, IconUserScan, IconActivity, IconCircleOff } from '@tabler/icons-react';
// import { NavLink } from 'react-router-dom'; // Import Link from react-router-dom

function AllLinks() {
    return (
        <>
            <NavLink
                href="/"
                label="Home"
                leftSection={<IconHome2 size="1rem" stroke={1.5} />}
            />
            <NavLink
                href="/workoutlog"
                label="Workout Log"
                leftSection={<IconLogs size="1rem" stroke={1.5} />}
            />
            <NavLink
                href="/profile"
                label="Profile"
                leftSection={<IconUserScan size="1rem" stroke={1.5} />}
            />
        </>
    );
}

export default AllLinks
