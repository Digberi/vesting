import { Header } from '@components';
import { CFC } from '@types';
//todo: add react-div-100vh to template
import Div100vh from 'react-div-100vh';

import { CContainer } from './container';

export const Layout: CFC = ({ children }) => {
  return (
    <Div100vh id={Layout.name}>
      <Header />
      <CContainer id={'Container'}>{children}</CContainer>
    </Div100vh>
  );
};
