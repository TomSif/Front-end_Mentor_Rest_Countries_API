import { useState, useMemo } from "react";
import { Link } from "react-router";
import { Region } from "../types";
import useCountries from "../hook/useCountries";
import CountryCard from "./CountryCard";

const REGIONS: Region[] = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

function Home() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [filter, setFilter] = useState<Region>("");
  const { countries } = useCountries();

  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      return (
        (filter === "" || country.region === filter) &&
        (searchInput === "" ||
          country.name.toLowerCase().includes(searchInput.toLowerCase()))
      );
    });
  }, [countries, filter, searchInput]);

  return (
    <main className="bg-grey-50 px-4 py-6 md:px-10 md:py-12 xl:px-21 dark:bg-blue-950">
      <fieldset className="text-grey-950 md: mt-5 flex w-full flex-col justify-between gap-10 md:flex-row md:gap-2 dark:text-white">
        <legend className="sr-only">Filtres</legend>
        <div className="relative w-full max-w-110 min-w-40 flex-1">
          <span className="absolute top-1/2 left-8 -translate-y-1/2">
            <img src="/images/Shape.png" alt="" />
          </span>
          <input
            id="search"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for a country"
            className="w-full bg-white py-4 pr-4 pl-18 shadow-md dark:bg-blue-900"
          />
        </div>
        <label className="sr-only" htmlFor="regions">
          Filter by Region
        </label>
        <select
          className="w-full max-w-50 bg-white px-8 py-4 pr-11 shadow-md dark:bg-blue-900"
          value={filter}
          onChange={(e) => setFilter(e.target.value as Region)}
          id="regions"
        >
          <option value="">Filter by Region</option>
          {REGIONS.map((region) => (
            <option className="pt-4" key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </fieldset>
      <section className="mt-8 md:mt-12">
        <ul className="grid w-full grid-cols-1 justify-items-center gap-10 gap-x-18 gap-y-18 px-10 md:grid-cols-2 md:justify-between lg:grid-cols-3 xl:grid-cols-4 xl:px-0">
          {filteredCountries.map((country) => (
            <li key={country.alpha3Code}>
              <Link className="card" to={`/country/${country.alpha3Code}`}>
                <CountryCard
                  name={country.name}
                  capital={country.capital}
                  region={country.region}
                  population={country.population}
                  flag={country.flag}
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Home;
