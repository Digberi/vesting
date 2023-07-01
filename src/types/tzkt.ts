export namespace Tzkt {
  export interface BigMapKeys<Key, Value> {
    id: number;
    active: boolean;
    hash: string;
    key: Key;
    value: Value;
    firstLevel: number;
    lastLevel: number;
    updates: number;
  }

  export interface Token {
    tokenId: string;
    metadata: {
      symbol: string;
      name: string;
      decimals: string;
      thumbnailUri: string;
    };
  }

  export enum BreadcrumbKind {
    Tokens = 'tokens',
    Contracts = 'contracts',
    BigMaps = 'bigmaps',
    Keys = 'keys'
  }
}
