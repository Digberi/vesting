import { Vestings } from '@components';
import { Box, Typography } from '@mui/material';

export const HomePage = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 5
      }}
    >
      <Typography variant="h1">Hello, world!</Typography>
      <Vestings />
    </Box>
  );
};
