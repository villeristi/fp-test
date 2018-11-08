import React from 'react';
import { RouteComponentProps } from '@reach/router';

import Navigation from '../Navigation/Navigation';

export default (props: RouteComponentProps) => {
  return (
    <div className="container">
      <h1>404</h1>
      <Navigation />
      <div className="content">
        <p>Not found :(</p>
      </div>
    </div>
  );
}
