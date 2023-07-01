import { tzktApi } from '@api';
import { Vesting } from '@types';
import { getTokenSlug, getUniqTokens, injectTzktTokenToVesting, vestingAssetToToken } from '@utils';
import { makeAutoObservable } from 'mobx';

import { TrinityFetcherStore } from '../trinity-fetcher.store';

export class VestingsDataProviderStore {
  readonly trinityStore = new TrinityFetcherStore([], async (vestingAddress: string) =>
    this.loadVestings(vestingAddress)
  );

  get trinity() {
    return this.trinityStore.trinity;
  }

  async load(vestingAddress: string) {
    return await this.trinityStore.load(vestingAddress);
  }

  constructor() {
    makeAutoObservable(this);
  }

  private async loadVestings(vestingAddress: string) {
    const result = await tzktApi.getBigMapKeys<string, Vesting.Root>(vestingAddress, 'vestings');

    const vestings = result.map(({ value, id }) => ({ ...value, id }));

    return await this.addTokens(vestings);
  }

  private async addTokens(vestings: Array<Vesting.VestingWithId>) {
    const tokens = vestings.map(({ asset }) => vestingAssetToToken(asset));

    const uniqueTokens = getUniqTokens(tokens);

    const tokensMap = await this.loadTokens(uniqueTokens);

    return vestings.map(v => injectTzktTokenToVesting(v, tokensMap));
  }

  private async loadTokens(tokens: Array<Vesting.Token>) {
    const _tokens = await Promise.all(
      tokens.map(async token => ({
        token: await tzktApi.getToken(token.address, token.tokenId),
        address: token.address
      }))
    );

    return new Map(
      _tokens.map(({ address, token }) => [
        getTokenSlug({ address, tokenId: token.tokenId }),
        token
      ])
    );
  }
}
