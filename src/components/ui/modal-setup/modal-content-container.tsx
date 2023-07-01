import { Box, styled } from '@mui/material';

export const ModalContentContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2, 4, 3),
  //todo: move to theme
  backgroundColor: theme.palette.background.paper, //theme.palette.mode === 'dark' ? '#0A1929' : 'white',
  //todo: move to theme
  boxShadow: `0px 2px 24px ${theme.palette.mode === 'dark' ? '#000' : '#383838'}`
}));
