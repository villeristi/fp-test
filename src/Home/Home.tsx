import React from 'react';
import { Link } from '@reach/router';

import { Pkg, ComponentProps } from '../util/types';


export default ({ packages }: ComponentProps) => {
  return (
    <div className="container">
      <h1>Lé packages</h1>

      <div className="content">
        <ul className="packages__list">
          {packages.map((item: Pkg) =>
            <li key={item.package}><Link to={`/pkg/${item.package}`}>{item.package}</Link></li>)
          }
        </ul>
      </div>
    </div>
  );
}
