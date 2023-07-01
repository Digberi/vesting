import { ColorModeStore } from '@modules/color-mode';
import { ConstructorOfValues } from '@types';
import { makeAutoObservable } from 'mobx';

import { SnackStore } from './snack.store';
import { VestingsStore } from './vestings';
import { TezosStore } from '../modules/tezos';

export class RootStore {
  static map: Map<ConstructorOfValues<RootStore>, keyof RootStore> = new Map();

  //#region modules
  colorModeStore = new ColorModeStore();
  tezosStore: TezosStore;
  //#endregion

  snackStore = new SnackStore();

  //#region bl
  vestingsStore: VestingsStore;
  //#endregion

  constructor() {
    this.tezosStore = new TezosStore(this);
    this.vestingsStore = new VestingsStore(this);

    makeAutoObservable(this);

    for (const [key, value] of Object.entries(this)) {
      RootStore.map.set(value.constructor.prototype.constructor, key as keyof RootStore);
    }
  }
}
