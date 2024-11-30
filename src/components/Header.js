import React, { useState, useEffect } from 'react';
import { AppShell, Text, Button, Title, Progress, Space, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';


const Header = () => {

    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell.Header>
            <div style={{ display: "flex" }}>
                <Burger
                    lineSize={2}
                    size="xl"
                    opened={opened}
                    onClick={toggle}
                    hiddenFrom="sm"
                />
                <Space w="l" />
                <Text size="xl" c="blue" fw={1000}>Colin's Lazy Generator</Text>
            </div>
        </AppShell.Header>
    )

}

export default Header