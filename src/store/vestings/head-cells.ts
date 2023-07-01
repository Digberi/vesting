import { Vesting } from '../../types';

export const headCells: Array<Vesting.HeadCell> = [
  {
    id: Vesting.HeadCellId.Token,
    label: 'Token',
    align: Vesting.Align.Left
  },
  {
    id: Vesting.HeadCellId.FullReward,
    label: 'Full Reward',
    align: Vesting.Align.Right
  },
  {
    id: Vesting.HeadCellId.Claimed,
    label: 'Claimed',
    align: Vesting.Align.Right
  },
  {
    id: Vesting.HeadCellId.Pending,
    label: 'Pending',
    align: Vesting.Align.Right
  },
  {
    id: Vesting.HeadCellId.LastClaimed,
    label: 'Last Claimed',
    align: Vesting.Align.Left
  },
  {
    id: Vesting.HeadCellId.EndsIn,
    label: 'Ends In',
    align: Vesting.Align.Left
  }
];
