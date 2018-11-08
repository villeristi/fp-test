import React from 'react';
import { Router } from '@reach/router';

import { ComponentProps } from '../util/types';
import Home from '../Home/Home';
import Single from '../Single/Single';
import FourOhFour from '../404/404';

export default ({ packages }: ComponentProps) => {
  return (
    <Router>
      <Home path="/" packages={packages} />
      <Single path="/pkg/:pkgName" packages={packages} />
      <FourOhFour default />
    </Router>
  );
}
