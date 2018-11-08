import { RouteComponentProps } from '@reach/router';

export interface Pkg {
  [key:string]: any; // Add index signature
  architecture: string,
  depends: string,
  description: string,
  homepage: string,
  installed_size: string,
  maintainer: string,
  original_maintainer: string,
  package: string,
  priority: string,
  replaces: string,
  section: string,
  status: string,
  version: string
}

export interface ComponentProps extends RouteComponentProps {
  packages: Pkg[]
  pkgName?: string
}

export interface NavigationProps {
  prevPkg?: Pkg
  nextPkg?: Pkg
}
