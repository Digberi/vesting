import { forwardRef } from 'react';

import { Fade, styled } from '@mui/material';

const UnstyledFadeBackdrop = forwardRef<HTMLDivElement, { open?: boolean }>((props, ref) => {
  const { open, ...other } = props;

  return (
    <Fade in={open}>
      <div ref={ref} {...other} />
    </Fade>
  );
});

export const FadeBackdrop = styled(UnstyledFadeBackdrop)`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;
