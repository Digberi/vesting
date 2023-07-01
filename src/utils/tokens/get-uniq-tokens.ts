import { getTokenSlug } from './get-token-slug';
import { Vesting } from '../../types';

export const getUniqTokens = (tokens: Array<Vesting.Token>) => {
  const uniqueSet = new Set();
  const uniqueObjects = [];

  for (const token of tokens) {
    const key = getTokenSlug(token);
    if (!uniqueSet.has(key)) {
      uniqueSet.add(key);
      uniqueObjects.push(token);
    }
  }

  return uniqueObjects;
};
