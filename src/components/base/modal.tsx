import { useState, ReactNode } from 'react';

import { Fade } from '@mui/material';

import { CFC } from '../../types';
import { FadeBackdrop, StyledModal, ModalContentContainer } from '../ui';

interface ModalProps {
  opener: (open: () => void) => ReactNode;
}

export const Modal: CFC<ModalProps> = ({ children, opener }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {opener(handleOpen)}
      <StyledModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: FadeBackdrop }}
      >
        <Fade in={open}>
          <ModalContentContainer>{children}</ModalContentContainer>
        </Fade>
      </StyledModal>
    </div>
  );
};
