import { useEffect, useState } from "react";
import { CountriesContext } from "./CountryContext";
import { CountrySummary } from "../types";

export function CountriesProvider({ children }: { children: React.ReactNode }) {
  const [countries, setCountries] = useState<CountrySummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags,cca3,capital,region,population,borders",
        );

        if (!response.ok) {
          throw new Error("Erreur lors du fetch");
        }

        const data: CountrySummary[] = await response.json();

        setCountries(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Une erreur inconnue est survenue");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) return <p>Chargement...</p>;

  if (error) return <p>{error}</p>;

  return (
    <CountriesContext.Provider value={{ countries }}>
      {children}
    </CountriesContext.Provider>
  );
}
