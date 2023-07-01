import { SortOrder, Trinity, Vesting } from '@types';
import { prepareVestingRawData, sortVestings } from '@utils';
import BigNumber from 'bignumber.js';
import { makeAutoObservable } from 'mobx';

import { headCells } from './head-cells';
import { VestingsDataProviderStore } from './vestings-data-provider.store';
import { filterByUserAddress } from '../../utils/vestings/filter-by-user-address';
import { RootStore } from '../root.store';

export class VestingsStore {
  readonly dataProvider = new VestingsDataProviderStore();

  sortOrder = SortOrder.Asc;
  orderBy: Vesting.HeadCellId = Vesting.HeadCellId.EndsIn;

  selectedVestings = new Set<number>();

  get rawData(): Array<Vesting.RawData> {
    const vestings = this.dataProvider.trinity.data ?? [];

    return vestings
      .filter(filterByUserAddress(this.rootStore.tezosStore.walletAddress ?? ''))
      .map(prepareVestingRawData(this.selectedVestings, headCells));
  }

  get vestings(): Trinity<Array<Vesting.RawData>> {
    const sortedVestings = this.rawData.slice().sort(sortVestings(this.sortOrder, this.orderBy));

    return {
      data: sortedVestings,
      isLoading: this.dataProvider.trinity.isLoading,
      error: this.dataProvider.trinity.error
    } as Trinity<Array<Vesting.RawData>>;
  }

  get sum() {
    return BigNumber.sum(
      ...this.rawData
        .filter(({ metadata: { isSelected } }) => isSelected)
        .map(({ pending }) => pending)
    );
  }

  get headCells() {
    return headCells;
  }

  constructor(private readonly rootStore: RootStore) {
    makeAutoObservable(this);
  }

  onRequestSort(_: unknown, property: Vesting.HeadCellId) {
    const isAsc = this.orderBy === property && this.sortOrder === SortOrder.Asc;
    this.sortOrder = isAsc ? SortOrder.Desc : SortOrder.Asc;
    this.orderBy = property;
  }

  handleVestingSelect(id: number) {
    if (this.selectedVestings.has(id)) {
      this.selectedVestings.delete(id);
    } else {
      this.selectedVestings.add(id);
    }
  }

  handleVestingSelectAll() {
    if (this.selectedVestings.size === this.dataProvider.trinity.data?.length) {
      this.selectedVestings.clear();
    } else {
      this.dataProvider.trinity.data?.forEach(({ id }) => this.selectedVestings.add(id));
    }
  }
}
