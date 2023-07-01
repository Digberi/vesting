import { Vesting } from '../../types';

export const getTokenSlug = (token: Vesting.Token): Vesting.TokenSlug =>
  `${token.address}_${token.tokenId}`;
