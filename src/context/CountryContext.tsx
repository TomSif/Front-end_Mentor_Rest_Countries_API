import { createContext } from "react";
import type { Country } from "../types";

export interface CountryContextType {
  countries: Country[];
}

export const CountriesContext = createContext<CountryContextType | undefined>(
  undefined,
);
