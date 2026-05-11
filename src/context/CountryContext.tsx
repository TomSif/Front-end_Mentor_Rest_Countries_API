import { createContext } from "react";
import type { CountrySummary } from "../types";

export interface CountryContextType {
  countries: CountrySummary[];
  loading: boolean;
  error: string | null;
}

export const CountriesContext = createContext<CountryContextType | undefined>(
  undefined,
);
