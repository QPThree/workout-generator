import { Badge, NavLink } from '@mantine/core';
import { IconHome2, IconLogs, IconUserScan, IconActivity, IconCircleOff } from '@tabler/icons-react';
import { useAuth0 } from '@auth0/auth0-react';

function AllLinks({ isAuthed }) {

    const {
        logout,
        user,
        isAuthenticated,
        isLoading,
    } = useAuth0();

    const ADMIN_USER = process.env.ADMIN_USER


    const isAdmin = user?.email === 'youngqp3@gmail.com'

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
                    {isAdmin && <NavLink
                        href="/admin"
                        label="admin"
                        leftSection={<IconUserScan size="1rem" stroke={1.5} />}
                    />}
                </>
            }
        </>
    );
}

export default AllLinks
