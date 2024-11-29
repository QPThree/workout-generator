import React, { useState, useEffect } from 'react';
import { AppShell, Button, Text } from '@mantine/core';
import { useAuth0 } from '@auth0/auth0-react';

const HomePageUnAuth = () => {
  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    isLoading,
  } = useAuth0();

  return (
    <AppShell.Main>
      <div className="unauth-homepage">
        <header>
          <Button onClick={() => loginWithRedirect()}>Log In</Button>
          <h1>Welcome</h1>
        </header>

        <Text>
          You will need to login / Authenticate in order to use
        </Text>
        <Text>
          I use a 3rd party authentication library. I will only see / access your name and email so we can track your workouts. Enjoy!
        </Text>

        <footer>
          <p>© 2024 My App. All Rights Reserved.</p>
        </footer>
      </div>
    </AppShell.Main>
  );
};

export default HomePageUnAuth;
