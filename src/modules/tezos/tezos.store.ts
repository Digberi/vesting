import { NetworkType } from '@airgap/beacon-sdk';
import { makeAutoObservable } from 'mobx';

import { DEFAULT_NETWORK } from './beacon.config';
import { wallet } from './beacon.wallet';
import { Tezos } from './tezos-toolkit.config';

//todo: refactor, refactor to dynamic
export class TezosStore {
  walletAddress: string | null = null;

  isConnecting = false;

  get isConnected() {
    return Boolean(this.walletAddress);
  }

  constructor() {
    makeAutoObservable(this);
  }

  async connect() {
    this.isConnecting = true;

    await this.disconnect();

    await wallet.requestPermissions({
      network: {
        type: NetworkType.MAINNET
      }
    });
    Tezos.setWalletProvider(wallet);
    Tezos.setRpcProvider(DEFAULT_NETWORK.rpcBaseURL);
    const activeAcc = await wallet.client.getActiveAccount();
    if (!activeAcc) {
      throw new Error('Not connected');
    }
    this.walletAddress = await wallet.getPKH();

    this.isConnecting = false;
  }

  async disconnect() {
    await wallet.disconnect();
    await wallet.clearActiveAccount();
    Tezos.setWalletProvider(wallet);

    this.walletAddress = null;
  }
}
