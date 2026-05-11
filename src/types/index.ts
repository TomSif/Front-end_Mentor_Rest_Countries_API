export type Country = {
  name: {
    common: string;
    official: string;
    nativeName: Record<
      string,
      {
        common: string;
        official: string;
      }
    >;
  };
  tld: string[];
  cca3: string;
  capital: string[];
  subregion: string;
  region: string;
  population: number;
  borders?: string[];
  languages: Record<string, string>;
  currencies: Record<
    string,
    {
      name: string;
      symbol: string;
    }
  >;
  flags: {
    png: string;
    svg: string;
  };
};

export type CountrySummary = {
  name: {
    common: string;
    official: string;
  };
  flags: {
    png: string;
    svg: string;
  };
  cca3: string;
  capital: string[];
  region: string;
  population: number;
  borders?: string[];
};

export type CountryMapEntry = {
  cca3: string;
  name: { common: string };
};

export type Region = "Africa" | "Americas" | "Asia" | "Europe" | "Oceania" | "";
