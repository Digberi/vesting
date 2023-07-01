import { IconButton } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { ColorMode, ColorModeStore } from '../../modules/color-mode';
import { WithStores } from '../../types';
import { withStores } from '../../utils';

const stores = {
  mode: ColorModeStore
};

export const ToggleColorModeView: WithStores<typeof stores> = ({ mode }) => {
  return (
    <IconButton onClick={() => mode.toggleMode()}>
      {mode.mode === ColorMode.Light ? '🌚' : '🌞'}
    </IconButton>
  );
};

export const ToggleColorMode = withStores(stores)(observer(ToggleColorModeView));
