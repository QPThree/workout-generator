import { Badge, NavLink } from '@mantine/core';
import { IconHome2, IconLogs, IconUserScan, IconActivity, IconCircleOff } from '@tabler/icons-react';

function AllLinks({ isAuthed }) {
    return (
        <>
            <NavLink
                href="/"
                label="Home"
                leftSection={<IconHome2 size="1rem" stroke={1.5} />}
            />
            {isAuthed &&
                <>
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
            }
        </>
    );
}

export default AllLinks
