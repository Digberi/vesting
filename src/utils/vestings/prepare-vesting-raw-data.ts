import { Vesting } from '@types';
import BigNumber from 'bignumber.js';

const tenIn18 = new BigNumber(10).pow(18);

export const prepareVestingRawData =
  (selected: Set<number>, headCells: Array<Vesting.HeadCell>) =>
  (reward: Vesting.Reward): Vesting.RawData => {
    const token = reward.asset;

    const tenInDecimals = new BigNumber(10).pow(token.metadata.decimals);
    const treasury = new BigNumber(reward.treasury);
    const speed = new BigNumber(reward.distr_speed_f);
    const rewardAmount = new BigNumber(reward.collected);
    const fullReward = treasury.div(tenInDecimals);
    const claimed = rewardAmount.div(tenInDecimals);

    const dt = treasury.times(tenIn18.times(1000)).div(speed);

    const t0 = new Date(reward.deadline).getTime() - dt.toNumber();

    const endsIn =
      Date.now() < new Date(reward.deadline).getTime()
        ? (new Date(reward.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
        : 0;

    const pending =
      Date.now() < new Date(reward.deadline).getTime()
        ? treasury
            .times(BigNumber(Date.now() - t0).div(dt))
            .minus(rewardAmount)
            .div(tenInDecimals)
        : new BigNumber(-1);

    const align = Object.fromEntries(headCells.map(cell => [cell.id, cell.align])) as Record<
      Vesting.HeadCellId,
      Vesting.Align
    >;

    return {
      token,
      fullReward,
      claimed,
      pending,
      lastClaimed: new Date(reward.last_claimed).toLocaleDateString(),
      endsIn: BigNumber(endsIn).integerValue(BigNumber.ROUND_DOWN),
      metadata: {
        id: reward.id,
        isSelected: selected.has(reward.id),
        align
      }
    };
  };
