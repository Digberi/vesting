import { SortOrder, Vesting } from '@types';

import { compareBigNumber, compareDate, compareTokens } from './comparators';

export const sortVestings = (order: SortOrder, orderBy: Vesting.HeadCellId) => {
  const isAsc = order === SortOrder.Asc;

  return (a: Vesting.RawData, b: Vesting.RawData) => {
    switch (orderBy) {
      case Vesting.HeadCellId.Pending:
      case Vesting.HeadCellId.FullReward:
      case Vesting.HeadCellId.Claimed:
      case Vesting.HeadCellId.EndsIn:
        return compareBigNumber(a[orderBy], b[orderBy], isAsc);
      case Vesting.HeadCellId.LastClaimed:
        return compareDate(a[orderBy], b[orderBy], isAsc);
      case Vesting.HeadCellId.Token:
        return compareTokens(a[orderBy], b[orderBy], isAsc);
    }
  };
};
