import { useContext } from "react";
import { CountriesContext } from "../context/CountryContext";

const useCountries = () => {
  const context = useContext(CountriesContext);
  if (!context) throw new Error("Context is not available");
  return context;
};
export default useCountries;
