import { MichelCodecPacker, TezosToolkit } from '@taquito/taquito';

import { DEFAULT_NETWORK } from './beacon.config';
import { wallet } from './beacon.wallet';
import { LambdaViewSigner } from './lambda-view.signer';

const michelEncoder = new MichelCodecPacker();

const Tezos = new TezosToolkit(DEFAULT_NETWORK.rpcBaseURL);

Tezos.setWalletProvider(wallet);
Tezos.setSignerProvider(new LambdaViewSigner());
Tezos.setPackerProvider(michelEncoder);

export { Tezos };
