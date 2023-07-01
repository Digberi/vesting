import { Vesting } from '../../types';

export const vestingAssetToToken = (asset: Vesting.Asset): Vesting.Token => {
  if ('fa2' in asset) {
    return {
      address: asset.fa2.token,
      tokenId: asset.fa2.id
    };
  }

  if ('fa12' in asset) {
    return {
      address: asset.fa12,
      tokenId: '0'
    };
  }

  return {
    address: 'tez',
    tokenId: '0'
  };
};
