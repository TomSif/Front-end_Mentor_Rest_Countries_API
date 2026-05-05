import { useState, useEffect } from "react";
import { CountriesContext } from "./CountryContext";
import { Country } from "../types";

export function CountriesProvider({ children }: { children: React.ReactNode }) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://restcountries.com/v2/all?fields=name,alpha3Code,capital,region,subregion,population,borders,nativeName,topLevelDomain,currencies,languages,flag",
        );
        if (!response.ok) throw new Error("Network Error");
        const data = (await response.json()) as Country[];
        setCountries(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  return (
    <CountriesContext.Provider value={{ countries, loading, error }}>
      {children}
    </CountriesContext.Provider>
  );
}
