import { FC } from 'react';

import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { Tzkt } from '@types';

interface TokenItemProps {
  token: Tzkt.Token;
}

export const TokenItem: FC<TokenItemProps> = ({ token }) => (
  <ListItem>
    <ListItemAvatar>
      <Avatar src={token.metadata.thumbnailUri}>
        {token.metadata.symbol[0].toUpperCase().slice(0, 2)}
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary={token.metadata.symbol} secondary={token.metadata.name} />
  </ListItem>
);
