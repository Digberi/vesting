import BigNumber from 'bignumber.js';

import { Tzkt } from '../../types';

export const compareBigNumber = (a: BigNumber, b: BigNumber, isAsc: boolean) => {
  const aNum = a;
  const bNum = b;

  return (aNum.lt(bNum) ? -1 : 1) * (isAsc ? 1 : -1);
};

export const compareDate = (a: string, b: string, isAsc: boolean) => {
  const aNum = Date.parse(a);
  const bNum = Date.parse(b);

  return (aNum < bNum ? -1 : 1) * (isAsc ? 1 : -1);
};

export const compareTokens = (a: Tzkt.Token, b: Tzkt.Token, isAsc: boolean) => {
  const aSym = a.metadata.symbol;
  const bSym = b.metadata.symbol;

  return (aSym < bSym ? -1 : 1) * (isAsc ? 1 : -1);
};
