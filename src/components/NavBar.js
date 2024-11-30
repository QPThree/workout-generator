import React, { useState, useEffect } from 'react';
import { AppShell, Text, Button, Title, Progress, Space } from '@mantine/core';

import { useAuth0 } from '@auth0/auth0-react';
import AllLinks from './AllLinks';



const NavBar = () => {

    const {
        logout,
        user,
        isAuthenticated,
        isLoading,
    } = useAuth0();


    return (
        <AppShell.Navbar p="md">
            {isAuthenticated && <Text size="xl" c="blue" fw={700}>Welcome, {user.name.split(" ")[0]} </Text>}
            <AllLinks isAuthed={isAuthenticated} />
            {isAuthenticated && <Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</Button>}
        </AppShell.Navbar>
    )


}

export default NavBar