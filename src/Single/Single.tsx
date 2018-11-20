import React from 'react';
import { Link, Redirect } from '@reach/router';

import { ComponentProps, Pkg } from '../util/types';
import Navigation from '../Navigation/Navigation';
import {
  getPackageByName,
  getIndex,
  getDepenciesFromString,
  getDependants,
  getPackageByIndex,
} from '../util/helpers';

export default ({ pkgName, packages }: ComponentProps) => {

  const currentPackage = getPackageByName(packages, pkgName);

  if(!currentPackage) {
    return <Redirect to="/404" noThrow />
  }

  const depencies = getDepenciesFromString(currentPackage.depends)
  const dependants = getDependants(packages, currentPackage.package);
  const prevPkg = getPackageByIndex(packages, getIndex(packages, currentPackage) - 1);
  const nextPkg = getPackageByIndex(packages, getIndex(packages, currentPackage) + 1);

  return (
    <div className="container">
      <h1>{currentPackage.package}</h1>

      <Navigation prevPkg={prevPkg} nextPkg={nextPkg} />

      <div className="content">
        <label>Description:</label>
        <div className="section" dangerouslySetInnerHTML={{__html: currentPackage.description}}></div>

        {depencies &&
          <React.Fragment>
            <label>Depends on:</label>
            <div className="section">
              {depencies.map((dep, index) =>
                !!getPackageByName(packages, dep) && <Link key={index} className="tag-btn" to={`/pkg/${dep}`}>{dep}</Link>
              )}
            </div>
          </React.Fragment>
        }

        {!!dependants.length &&
          <React.Fragment>
            <label>Dependent in:</label>
            <div className="section">
              {dependants.map((dep, index) =>
                <Link key={index} className="tag-btn" to={`/pkg/${dep.package}`}>{dep.package}</Link>
              )}
            </div>
          </React.Fragment>
        }

      </div>
    </div>
  );
}
