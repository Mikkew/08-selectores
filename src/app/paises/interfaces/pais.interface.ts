export interface PaisSmall {
  name: string;
  alpha3Code: string;
}

export interface Pais {
  name?: string;
  topLevelDomain?: string[];
  alpha2Code?: string;
  alpha3Code?: string;
  callingCodes?: string[];
  capital?: string;
  altSpellings?: string[];
  region?: Region;
  subregion?: Subregion;
  population?: number;
  latlng?: number[];
  demonym?: string;
  area?: number | null;
  gini?: number | null;
  timezones?: string[];
  borders?: string[];
  nativeName?: string;
  numericCode?: null | string;
  currencies?: Currency[];
  languages?: Language[];
  translations?: Translations;
  flag?: string;
  regionalBlocs?: RegionalBloc[];
  cioc?: null | string;
}

export interface Currency {
  code?: string;
  name?: string;
  symbol?: null | string;
}

export interface Language {
  iso639_1?: string;
  iso639_2?: string;
  name?: string;
  nativeName?: string;
}

export enum Region {
  Europe = 'Europe',
}

export interface RegionalBloc {
  acronym?: Acronym;
  name?: Name;
  otherAcronyms?: string[];
  otherNames?: any[];
}

export enum Acronym {
  Cefta = 'CEFTA',
  Eeu = 'EEU',
  Efta = 'EFTA',
  Eu = 'EU',
}

export enum Name {
  CentralEuropeanFreeTradeAgreement = 'Central European Free Trade Agreement',
  EurasianEconomicUnion = 'Eurasian Economic Union',
  EuropeanFreeTradeAssociation = 'European Free Trade Association',
  EuropeanUnion = 'European Union',
}

export enum Subregion {
  EasternEurope = 'Eastern Europe',
  NorthernEurope = 'Northern Europe',
  SouthernEurope = 'Southern Europe',
  WesternEurope = 'Western Europe',
}

export interface Translations {
  de?: null | string;
  es?: string;
  fr?: null | string;
  ja?: null | string;
  it?: null | string;
  br?: string;
  pt?: string;
  nl?: null | string;
  hr?: string;
  fa?: string;
}
