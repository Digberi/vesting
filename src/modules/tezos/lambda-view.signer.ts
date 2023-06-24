import { Signer } from '@taquito/taquito/dist/types/signer/interface';

import { wallet } from './beacon.wallet';

export class LambdaViewSigner implements Signer {
  async publicKeyHash() {
    const acc = await wallet.client.getActiveAccount();
    if (!acc) {
      throw new Error('Not connected');
    }

    return acc.address;
  }
  async publicKey() {
    const acc = await wallet.client.getActiveAccount();
    if (!acc) {
      throw new Error('Not connected');
    }

    return acc.publicKey;
  }
  async secretKey() {
    throw new Error('Secret key cannot be exposed');

    return '';
  }
  async sign() {
    throw new Error('Cannot sign');

    return {
      bytes: '',
      sig: '',
      prefixSig: '',
      sbytes: ''
    };
  }
}
