import { useEffect, useState } from "react";
import { CountriesContext } from "./CountryContext";
import { Country } from "../types";
import data from "../../data.json";

export function CountriesProvider({ children }: { children: React.ReactNode }) {
  const [countries, setCountries] = useState<Country[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchCountries = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await fetch(
  //         `https://api.countrylayer.com/v2/all?access_key=${import.meta.env.VITE_API_KEY}`,
  //       );
  //       if (!response.ok) throw new Error("Network Error");
  //       const data = (await response.json()) as Country[];
  //       setCountries(data);
  //       console.log(data);
  //     } catch (err) {
  //       setError(err instanceof Error ? err.message : "unknown error");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchCountries();
  // }, []);

  // to change with real api
  useEffect(() => {
    setCountries(data as Country[]);
  }, []);

  return (
    <CountriesContext.Provider value={{ countries }}>
      {children}
    </CountriesContext.Provider>
  );
}
