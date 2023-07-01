import { Vesting } from '../../types';

export const filterByUserAddress = (userAddress: string) => (reward: Vesting.Reward) =>
  reward.receiver === userAddress;
