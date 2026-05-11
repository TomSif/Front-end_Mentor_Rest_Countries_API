import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import type { Country } from "../types/index.ts";

function CountryDetail() {
  const [country, setCountry] = useState<Country | null>(null);
  const [countriesMap, setCountriesMap] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { alpha3Code } = useParams<{ alpha3Code: string }>();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [countryRes, mapRes] = await Promise.all([
          fetch(
            `https://restcountries.com/v3.1/alpha/${alpha3Code}?fields=name,tld,cca3,capital,subregion,region,population,borders,languages,currencies,flags`,
          ),
          fetch("https://restcountries.com/v3.1/all?fields=cca3,name"),
        ]);

        const countryData = await countryRes.json();
        const mapData = await mapRes.json();

        setCountry(countryData);
        setCountriesMap(mapData);
      } catch (err) {
        setError("Erreur lors du fetch");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [alpha3Code]);

  if (loading) return <p>Chargement...</p>;

  if (error) return <p>Country not found</p>;

  if (!country) return <p>Aucun pays trouvé</p>;

  const getBorderName = (code: string) =>
    countriesMap.find((c) => c.cca3 === code)?.name.common;

  return (
    <main className="px-7 py-10 md:px-25 dark:text-white">
      <button
        onClick={() => navigate(-1)}
        type="button"
        className="btn text-preset-5-light text-grey-950 flex h-8 w-full max-w-26 items-center rounded-sm bg-white text-center drop-shadow-sm dark:bg-blue-900"
      >
        <span className="mx-auto dark:text-white">&larr; Back</span>
      </button>

      <article className="mt-12 flex flex-col gap-12 xl:flex-row xl:items-start">
        <section className="w-full max-w-140">
          <img
            className="aspect-4/3 rounded-lg object-cover"
            src={country.flags.svg}
            alt={`flag of ${country.name.common}`}
          />
        </section>

        <section>
          <h2 className="text-preset-1 text-grey-950 mb-4 md:mb-6 dark:text-white">
            {country.name.common}
          </h2>

          <dl className="flex flex-col gap-8 space-y-1 xl:gap-16">
            <div className="flex flex-col gap-8 md:flex-row md:justify-between">
              <div>
                <div className="flex gap-1">
                  <dt className="text-preset-9-semibold">Native Name:</dt>
                  <dd className="text-preset-9-light">
                    {Object.values(country.name.nativeName)[0]?.common}
                  </dd>
                </div>
                <div className="flex gap-1">
                  <dt className="text-preset-9-semibold">Population:</dt>
                  <dd className="text-preset-9-light">
                    {country.population.toLocaleString()}
                  </dd>
                </div>
                <div className="flex gap-1">
                  <dt className="text-preset-9-semibold">Region:</dt>
                  <dd className="text-preset-9-light">{country.region}</dd>
                </div>
                <div className="flex gap-1">
                  <dt className="text-preset-9-semibold">Sub Region:</dt>
                  <dd className="text-preset-9-light">{country.subregion}</dd>
                </div>
                <div className="flex gap-1">
                  <dt className="text-preset-9-semibold">Capital:</dt>
                  <dd className="text-preset-9-light">{country.capital}</dd>
                </div>
              </div>

              <div>
                <div className="flex gap-1">
                  <dt className="text-preset-9-semibold">Top Level Domain:</dt>
                  <dd className="text-preset-9-light">
                    {country.tld.join(", ")}
                  </dd>
                </div>
                <div className="flex gap-1">
                  <dt className="text-preset-9-semibold">Currencies:</dt>
                  <dd className="text-preset-9-light">
                    {Object.entries(country.currencies).map(
                      ([code, currency]) => (
                        <p key={code}>{currency.name}</p>
                      ),
                    )}
                  </dd>
                </div>
                <div className="flex gap-1">
                  <dt className="text-preset-9-semibold">Languages:</dt>
                  <dd className="text-preset-9-light">
                    {Object.values(country.languages).join(", ")}
                  </dd>
                </div>
              </div>
            </div>

            <div>
              <div className="flex flex-col items-baseline gap-4 md:flex-row">
                <dt className="text-preset-10-semibold min-w-8 flex-1">
                  Border Countries:
                </dt>
                <dd className="text-preset-9-light flex-2">
                  <ul className="flex flex-wrap gap-4">
                    {country.borders?.map((b) => {
                      const name = getBorderName(b);

                      if (!name) return null;

                      return (
                        <li key={b}>
                          <Link
                            className="btn text-preset-6-light flex h-auto items-center justify-center bg-white px-4 py-1.5 text-center drop-shadow-sm dark:bg-blue-900"
                            to={`/country/${b}`}
                          >
                            {name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>{" "}
                </dd>
              </div>
            </div>
          </dl>
        </section>
      </article>
    </main>
  );
}

export default CountryDetail;
