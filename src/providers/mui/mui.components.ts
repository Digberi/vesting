import { OverrideMuiLinkComponents } from '@components';
import { ThemeOptions } from '@mui/material';

export const MuiComponents: Pick<ThemeOptions, 'components'> = {
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained'
      }
    },
    ...OverrideMuiLinkComponents
  }
};
