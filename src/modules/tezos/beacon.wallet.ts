import { BeaconWallet } from '@taquito/beacon-wallet';

import { beaconOptions } from './beacon.config';

export const wallet = new BeaconWallet(beaconOptions);
