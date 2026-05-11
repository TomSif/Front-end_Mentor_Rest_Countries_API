import { createContext } from "react";
import type { CountrySummary } from "../types";

export interface CountryContextType {
  countries: CountrySummary[];
}

export const CountriesContext = createContext<CountryContextType | undefined>(
  undefined,
);
