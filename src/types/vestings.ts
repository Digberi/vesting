import BigNumber from 'bignumber.js';

import { Tzkt } from './tzkt';

export namespace Vesting {
  interface Fa2 {
    fa2: {
      token: string;
      id: string;
    };
  }

  interface Fa12 {
    fa12: string;
  }

  interface Tez {
    tez: unknown;
  }

  export type Asset = Fa2 | Fa12 | Tez;

  export interface Root {
    asset: Asset;
    receiver: string;
    treasury: string;
    deadline: string;
    collected: string;
    distr_speed_f: string;
    last_claimed: string;
  }

  export interface VestingWithId extends Root {
    id: number;
  }

  export interface Token {
    tokenId: string;
    address: string;
  }

  export interface Reward extends Omit<VestingWithId, 'asset'> {
    asset: Tzkt.Token;
  }

  export type TokenSlug = `${Token['address']}_${Token['tokenId']}`;

  export enum HeadCellId {
    Token = 'token',
    FullReward = 'fullReward',
    Claimed = 'claimed',
    Pending = 'pending',
    LastClaimed = 'lastClaimed',
    EndsIn = 'endsIn'
  }

  interface Metadata {
    id: number;
    isSelected: boolean;
    align: Record<HeadCellId, Align>;
  }

  export interface RawData {
    [HeadCellId.Token]: Tzkt.Token;
    [HeadCellId.FullReward]: BigNumber;
    [HeadCellId.Claimed]: BigNumber;
    [HeadCellId.Pending]: BigNumber;
    [HeadCellId.LastClaimed]: string;
    [HeadCellId.EndsIn]: BigNumber;
    metadata: Metadata;
  }

  export enum Align {
    Left = 'left',
    Right = 'right',
    Center = 'center'
  }

  export interface HeadCell {
    id: HeadCellId;
    label: string;
    align: Align;
  }
}
