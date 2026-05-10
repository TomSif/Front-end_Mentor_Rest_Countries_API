import { useEffect, useState } from "react";
import { CountriesContext } from "./CountryContext";
import { Country } from "../types";
import data from "../../data.json";

export function CountriesProvider({ children }: { children: React.ReactNode }) {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    setCountries(data as Country[]);
  }, []);

  return (
    <CountriesContext.Provider value={{ countries }}>
      {children}
    </CountriesContext.Provider>
  );
}
