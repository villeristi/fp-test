import React from 'react';
import { Link } from '@reach/router';

import { NavigationProps } from '../util/types';

export default ({ prevPkg, nextPkg }: NavigationProps) => {
  return (
    <nav className="nav">
      {prevPkg && <Link className="prev" to={`/pkg/${prevPkg.package}`}>&#8592; {prevPkg.package}</Link>}

      {nextPkg && <Link className="next" to={`/pkg/${nextPkg.package}`}>{nextPkg.package} &#8594;</Link>}

      <Link className="home" to={'/'}>Home</Link>
    </nav>
  );
}
