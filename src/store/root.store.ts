import { ColorModeStore } from '@modules/color-mode';
import { ConstructorOfValues } from '@types';
import { makeAutoObservable } from 'mobx';

import { SnackStore } from './snack.store';
import { TezosStore } from '../modules/tezos';

export class RootStore {
  static map: Map<ConstructorOfValues<RootStore>, keyof RootStore> = new Map();

  //#region modules
  colorModeStore = new ColorModeStore();
  beaconStore = new TezosStore();
  //#endregion

  snackStore = new SnackStore();

  constructor() {
    makeAutoObservable(this);

    for (const [key, value] of Object.entries(this)) {
      RootStore.map.set(value.constructor.prototype.constructor, key as keyof RootStore);
    }
  }
}
