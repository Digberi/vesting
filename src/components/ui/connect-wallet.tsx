import { Box, Button } from '@mui/material';
import { shortize, withStores } from '@utils';
import { observer } from 'mobx-react-lite';

import { TezosStore } from '../../modules/tezos';
import { WithStores } from '../../types';
const stores = {
  tezos: TezosStore
};

const ConnectWalletView: WithStores<typeof stores> = ({ tezos }) => {
  return (
    <Box>
      {tezos.isConnected ? (
        <Button onClick={async () => tezos.disconnect()}>{shortize(tezos.walletAddress!)}</Button>
      ) : (
        <Button onClick={async () => tezos.connect()}>Connect Wallet</Button>
      )}
    </Box>
  );
};

export const ConnectWallet = withStores(stores)(observer(ConnectWalletView));
