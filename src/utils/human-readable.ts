//todo: implement
import { AbortedBeaconError } from '@airgap/beacon-sdk';

export const humanReadable = (error: unknown): string => {
  if (error instanceof AbortedBeaconError) {
    return 'Wallet connection aborted';
  } else if (error instanceof Error) {
    return error.message;
  } else if (typeof error === 'string') {
    return error;
  }
  console.debug(error);

  return 'Something went wrong';
};
