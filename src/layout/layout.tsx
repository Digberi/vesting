import { CFC } from '@types';
import Div100vh from 'react-div-100vh';

import { CContainer } from './container';
import { Header } from '../components/base';

export const Layout: CFC = ({ children }) => {
  return (
    <Div100vh id={Layout.name}>
      <Header />
      <CContainer id={'Container'}>{children}</CContainer>
    </Div100vh>
  );
};
