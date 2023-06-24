import { Box, Typography } from '@mui/material';

import { ConnectWallet } from '../../components/ui/connect-wallet';

export const HomePage = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 5
      }}
    >
      <Typography variant="h1">Hello, world!</Typography>
      <ConnectWallet />
    </Box>
  );
};
