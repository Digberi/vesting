import { NetworkType } from '@airgap/beacon-sdk';
import { makeAutoObservable, observe } from 'mobx';

import { DEFAULT_NETWORK } from './beacon.config';
import { wallet } from './beacon.wallet';
import { Tezos } from './tezos-toolkit.config';
import { type RootStore } from '../../store';

export class TezosStore {
  walletAddress: string | null = null;

  isConnecting = false;

  get isConnected() {
    return Boolean(this.walletAddress);
  }

  constructor(private readonly rootStore: RootStore) {
    makeAutoObservable(this);
    observe(this.rootStore.colorModeStore, async change => {
      if (change.type === 'update' && change.name === 'mode') {
        await wallet.client.setColorMode(change.newValue);
      }
    });
  }

  async connect() {
    try {
      const activeAccount = await wallet.client.getActiveAccount();
      if (!activeAccount) {
        await wallet.requestPermissions({
          network: {
            type: NetworkType.MAINNET
          }
        });
      }
      Tezos.setWalletProvider(wallet);
      Tezos.setRpcProvider(DEFAULT_NETWORK.rpcBaseURL);
      const activeAcc = await wallet.client.getActiveAccount();
      if (!activeAcc) {
        throw new Error('Not connected');
      }
      this.walletAddress = await wallet.getPKH();
    } catch (error) {
      console.log(error);
    }
  }

  async disconnect() {
    await wallet.disconnect();
    await wallet.clearActiveAccount();
    Tezos.setWalletProvider(wallet);

    if (!this.isConnected) {
      return;
    }
    this.walletAddress = null;
  }
}
