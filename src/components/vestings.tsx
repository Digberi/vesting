import { useEffect } from 'react';

import { CircularProgress, Typography } from '@mui/material';
import { VestingsStore } from '@store';
import { ArrayElement, Vesting, WithStores } from '@types';
import { withStores } from '@utils';
import BigNumber from 'bignumber.js';
import { observer } from 'mobx-react-lite';

import { Table, TokenItem } from './ui';

const stores = {
  vestings: VestingsStore
};

const toFixed = (value: BigNumber) => value.toFixed(3, BigNumber.ROUND_DOWN);

const VestingsView: WithStores<typeof stores> = ({ vestings }) => {
  useEffect(() => {
    void vestings.dataProvider.load('KT1N5HyBD5HZ7NZwmDar1LmBN7WkHbdr6zb9');
  }, [vestings]);

  if (vestings.vestings.isLoading) {
    return <CircularProgress />;
  }

  if (vestings.vestings.error) {
    return <div>{vestings.vestings.error.message}</div>;
  }

  const rows = vestings.vestings.data.map(rawData => {
    const { token, lastClaimed, metadata, fullReward, claimed, pending, endsIn } = rawData;

    const leftLabel = pending.lt(0)
      ? 'All collected'
      : pending.gt(fullReward.minus(claimed))
      ? toFixed(fullReward.minus(claimed))
      : toFixed(pending);

    return {
      //Order is important
      [Vesting.HeadCellId.Token]: <TokenItem token={token} />,

      [Vesting.HeadCellId.FullReward]: toFixed(fullReward),
      [Vesting.HeadCellId.Claimed]: toFixed(claimed),
      [Vesting.HeadCellId.Pending]: leftLabel,
      [Vesting.HeadCellId.LastClaimed]: lastClaimed,
      [Vesting.HeadCellId.EndsIn]: endsIn.isZero() ? 'Ended' : `${endsIn.toFixed()} days`,
      metadata
    } as const;
  });

  return (
    <div>
      <Typography variant={'h4'}>Total pending {vestings.sum.toFixed(3)}</Typography>
      <Table<Vesting.HeadCellId, ArrayElement<typeof rows>>
        rows={rows}
        headCells={vestings.headCells}
        onRequestSort={(a, b) => vestings.onRequestSort(a, b)}
        order={vestings.sortOrder}
        orderBy={vestings.orderBy}
        handleSelect={(_: unknown, id: number) => vestings.handleVestingSelect(id)}
        onSelectAllClick={() => vestings.handleVestingSelectAll()}
      />
    </div>
  );
};

export const Vestings = withStores(stores)(observer(VestingsView));
