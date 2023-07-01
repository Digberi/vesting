import { useMemo } from 'react';

import { AppBar, Box, Link, Container, Tab, Tabs } from '@mui/material';
import { matchPath, useLocation } from 'react-router-dom';

import { ToggleColorMode } from '../ui';
import { ConnectWallet } from '../ui/connect-wallet';

interface Route {
  path: string;
  label: string;
}

//todo: deal with config repeating
const routesConfig: Array<Route> = [
  {
    path: '/',
    label: 'Explore'
  },
  {
    path: '/distribute',
    label: 'Distribute'
  },
  {
    path: '/stop',
    label: 'Stop Vesting'
  },
  {
    path: '/change-admin',
    label: 'Change Admin'
  }
];

const useRoutesMatch = (routes: Array<Route>) => {
  const location = useLocation();

  return useMemo(() => {
    if (!location.pathname) {
      return -1;
    }
    const matches = routes.map(route => matchPath(route.path, location.pathname));

    return matches.findIndex(match => !!match);
  }, [routes, location.pathname]);
};

export const Header = () => {
  const match = useRoutesMatch(routesConfig);

  return (
    <AppBar id={Header.name} position="static">
      <Container>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Tabs value={match}>
            {routesConfig.map(route => (
              <Tab label={route.label} component={Link} key={route.path} href={route.path} />
            ))}
          </Tabs>
          <Box sx={{ display: 'flex', gap: 2, p: 0.5 }}>
            <ToggleColorMode />
            <ConnectWallet />
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
};
