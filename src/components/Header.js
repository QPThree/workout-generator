import React, { useState, useEffect } from 'react';
import { AppShell, Text, Button, Title, Progress, Space, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCookieManFilled, IconCookieMan } from '@tabler/icons-react';
import { Tabs, rem } from '@mantine/core';


const Header = ({ opened, toggle }) => {

    // const [opened, { toggle }] = useDisclosure();
    const iconStyle = { width: rem(30), height: rem(30) };

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
                <div style={{ display: "flex", justifyContent: 'flex-end', paddingLeft: "2.5%", paddingTop: "10px" }}>
                    <IconCookieManFilled style={iconStyle} />
                    <Text size="xl" c="blue" fw={1000}>Colin's Lazy Generator</Text>
                </div>
            </div>
        </AppShell.Header>
    )

}

export default Header