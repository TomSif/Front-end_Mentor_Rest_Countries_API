import { createContext } from "react";
import type { Country } from "../types";

export interface CountryContextType {
  countries: Country[];
  // to change with real api
  // loading: boolean;
  // error: string | null;
}

export const CountriesContext = createContext<CountryContextType | undefined>(
  undefined,
);
