import { getTokenSlug } from './get-token-slug';
import { vestingAssetToToken } from './vesting-asset-to-token';
import { Tzkt, Vesting } from '../../types';

export const injectTzktTokenToVesting = (
  vesting: Vesting.VestingWithId,
  tokensMap: Map<Vesting.TokenSlug, Tzkt.Token>
): Vesting.Reward => {
  const tokenSlug = getTokenSlug(vestingAssetToToken(vesting.asset));

  const token = tokensMap.get(tokenSlug);

  if (!token) {
    throw new Error(`Token ${tokenSlug} not found`);
  }

  return {
    ...vesting,
    asset: token
  };
};
