import { Modal as MuiModal, styled } from '@mui/material';

export const StyledModal = styled(MuiModal)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
