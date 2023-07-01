import { ContentCopy } from '@mui/icons-material';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { shortize, withStores } from '@utils';
import { observer } from 'mobx-react-lite';

import { TezosStore } from '../../modules/tezos';
import { WithStores } from '../../types';
import { copy } from '../../utils/copy';
import { Modal } from '../base/modal';

const stores = {
  tezos: TezosStore
};

const ConnectWalletView: WithStores<typeof stores> = ({ tezos }) => {
  if (tezos.isConnected) {
    return (
      <Modal opener={open => <Button onClick={open}>{shortize(tezos.walletAddress!)}</Button>}>
        <Box>
          <Box>
            <Typography variant="body1">{tezos.walletAddress}</Typography>
            <IconButton onClick={() => copy(tezos.walletAddress!)}>
              <ContentCopy />
            </IconButton>
          </Box>
          <Button onClick={async () => tezos.disconnect()}>Disconnect</Button>
        </Box>
      </Modal>
    );
  }

  return <Button onClick={async () => tezos.connect()}>Connect Wallet</Button>;
};

export const ConnectWallet = withStores(stores)(observer(ConnectWalletView));
