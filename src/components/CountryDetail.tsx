import { useParams, useNavigate, Link } from "react-router";
import useCountries from "../hook/useCountries";

function CountryDetail() {
  const { alpha3Code } = useParams<{ alpha3Code: string }>();
  const { countries } = useCountries();
  const navigate = useNavigate();

  const findCountry = countries.find(
    (country) => country.alpha3Code === alpha3Code,
  );

  const getBorderName = (code: string) =>
    countries.find((country) => country.alpha3Code === code)?.name;

  if (!findCountry) {
    return (
      <main className="bg-grey-50 px-7 py-10">
        <p className="text-preset-5-light text-grey-950">Country not found</p>
      </main>
    );
  }

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
            src={findCountry.flag}
            alt={`flag of ${findCountry.name}`}
          />
        </section>

        <section>
          <h2 className="text-preset-1 text-grey-950 mb-4 md:mb-6 dark:text-white">
            {findCountry.name}
          </h2>

          <dl className="flex flex-col gap-8 space-y-1 xl:gap-16">
            <div className="flex flex-col gap-8 md:flex-row md:justify-between">
              <div>
                <div className="flex gap-1">
                  <dt className="text-preset-9-semibold">Native Name:</dt>
                  <dd className="text-preset-9-light">
                    {findCountry.nativeName}
                  </dd>
                </div>
                <div className="flex gap-1">
                  <dt className="text-preset-9-semibold">Population:</dt>
                  <dd className="text-preset-9-light">
                    {findCountry.population.toLocaleString()}
                  </dd>
                </div>
                <div className="flex gap-1">
                  <dt className="text-preset-9-semibold">Region:</dt>
                  <dd className="text-preset-9-light">{findCountry.region}</dd>
                </div>
                <div className="flex gap-1">
                  <dt className="text-preset-9-semibold">Sub Region:</dt>
                  <dd className="text-preset-9-light">
                    {findCountry.subregion}
                  </dd>
                </div>
                <div className="flex gap-1">
                  <dt className="text-preset-9-semibold">Capital:</dt>
                  <dd className="text-preset-9-light">{findCountry.capital}</dd>
                </div>
              </div>

              <div>
                <div className="flex gap-1">
                  <dt className="text-preset-9-semibold">Top Level Domain:</dt>
                  <dd className="text-preset-9-light">
                    {findCountry?.topLevelDomain.join(", ")}
                  </dd>
                </div>
                <div className="flex gap-1">
                  <dt className="text-preset-9-semibold">Currencies:</dt>
                  <dd className="text-preset-9-light">
                    {findCountry?.currencies.map((c) => c.name).join(", ")}
                  </dd>
                </div>
                <div className="flex gap-1">
                  <dt className="text-preset-9-semibold">Languages:</dt>
                  <dd className="text-preset-9-light">
                    {findCountry?.languages.map((l) => l.name).join(", ")}
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
                    {findCountry.borders
                      ? findCountry?.borders.map((b) => (
                          <li key={b}>
                            <Link
                              className="btn text-preset-6-light flex h-auto items-center justify-center bg-white px-4 py-1.5 text-center drop-shadow-sm dark:bg-blue-900"
                              to={`/country/${b}`}
                            >
                              {getBorderName(b)}
                            </Link>
                          </li>
                        ))
                      : ""}
                  </ul>
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
