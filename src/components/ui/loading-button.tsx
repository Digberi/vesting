import { ComponentProps } from 'react';

import { Box, Button, CircularProgress } from '@mui/material';
import { CFC } from '@types';

interface LoadingButtonProps extends ComponentProps<typeof Button> {
  loading: boolean;
}

export const LoadingButton: CFC<LoadingButtonProps> = ({ children, loading, ...props }) => {
  return (
    <Box position="relative">
      <Button {...props}>{children}</Button>
      {loading && (
        <CircularProgress
          color="secondary"
          size={24}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />
      )}
    </Box>
  );
};
