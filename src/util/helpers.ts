import { Pkg } from "./types";

// Matches newline IF the preceeding line does not start with a space
const splitMatcher = /(?:\n(?=\S))/gi


// Matches a package-name (alphanumeric with dashes & dots) & ignores versioning inside brackets
const depenciesMatcher = /[A-Za-z]+[\w-.]+/gi;


/**
 * Get package by it's name
 * @param packages
 * @param pkgName
 */
export const getPackageByName = (packages: Pkg[], pkgName: string | undefined): Pkg | undefined => packages.find((item) => item.package === pkgName)


/**
 * Get current item index
 * @param collection
 * @param item
 */
export const getIndex = (collection: object[], item: object): number => collection.indexOf(item)


/**
 * Get package by given index
 * @param packages
 * @param index
 */
export const getPackageByIndex = (packages: Pkg[], index: number): Pkg | undefined => index >= 0 && index < packages.length ? [...packages][index] : undefined;


/**
 * Filter Pkg-collection by single package depencies
 * @param packages
 * @param pkgName
 */
export const getDependants = (packages: Pkg[], pkgName: string): Pkg[] => packages.filter((item) => item.depends && item.depends.includes(pkgName))


/**
 * Extract dep-names from string
 * @param str
 */
export const getDepenciesFromString = (str: string): RegExpMatchArray | null => !!str ? str.match(depenciesMatcher) : null;


/**
 * Create packages-collection from file-contents
 * @param text
 */
export const createPackagesCollection = (text: string): Pkg[] => [...text.split("\n\n").map(generatePackage)].sort(sorter('package'));


/**
 * Create a package from section-lines
 * @param section
 */
export const generatePackage = (section: string): Pkg => {
  return section.split(splitMatcher).reduce((obj, line) => {
    return { ...obj, ...line.split(splitMatcher).reduce(createKeyvaluePairWith(': '), {})}
  }, {} as Pkg);
}


/**
 * Extract key-value-pairs from string & return merged object with values assigned
 * @param splitter
 */
export const createKeyvaluePairWith = (splitter: string) => (obj: object, line: string): object => {
  const kvPair: string[] = line.split(splitter);
  const key = kvPair[0].toLowerCase().replace('-', '_');
  const value = kvPair[1] && kvPair[1].trim();

  return {...obj, ...{[key]: value}};
}


/**
 * Sort by defined key
 * @param key
 */
const sorter = (key: string) => (a: Pkg, b: Pkg): number => (a[key] < b[key]) ? -1 : (a[key] > b[key]) ? 1 : 0;
