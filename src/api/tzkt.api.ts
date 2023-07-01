import { typedFetch } from '@utils';

import { Tzkt } from '../types';

//todo: move to config
const avatarsUrl = 'https://services.tzkt.io/v1/avatars/';
class TzktApi {
  readonly #baseURL = 'https://api.tzkt.io';

  async getToken(tokenAddress: string, tokenId: string) {
    const query = new URLSearchParams({
      contract: tokenAddress
    });

    const url = this.createURL(Tzkt.BreadcrumbKind.Tokens, query);

    const data = await typedFetch<Array<Tzkt.Token>>(url);

    const tokenInfo = data.find(token => token.tokenId === tokenId);

    if (!tokenInfo) {
      throw new Error('Token not found');
    }

    tokenInfo.metadata.thumbnailUri = `${avatarsUrl}${tokenAddress}`;

    return tokenInfo;
  }

  async getBigMapKeys<Key, Value>(contractAddress: string, bigMapName: string) {
    const url = this.createURL(
      `${Tzkt.BreadcrumbKind.Contracts}/${contractAddress}/${Tzkt.BreadcrumbKind.BigMaps}/${bigMapName}/${Tzkt.BreadcrumbKind.Keys}`
    );

    return await typedFetch<Array<Tzkt.BigMapKeys<Key, Value>>>(url);
  }

  private createURL(path: string, query?: URLSearchParams) {
    const url = new URL(`v1/${path}`, this.#baseURL);
    if (query) {
      url.search = query.toString();
    }

    return url;
  }
}

export const tzktApi = new TzktApi();
