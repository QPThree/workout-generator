import React from "react"
import NavBar from "./NavBar"
import Header from "./Header"
import { AppShell } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"

const LayoutComponent = ({ children }) => {
    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            padding="md">
            <Header opened={opened} toggle={toggle} />
            <NavBar />
            <AppShell.Main>
                {children}
            </AppShell.Main>
        </AppShell>


    )


}

export default LayoutComponent