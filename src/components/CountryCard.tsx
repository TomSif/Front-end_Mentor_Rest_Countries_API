interface CountryCardProps {
  name: string;
  capital?: string[];
  region: string;
  population: number;
  flag: string;
}

const CountryCard = ({
  name,
  capital,
  region,
  population,
  flag,
}: CountryCardProps) => {
  return (
    <article className="text-grey-950 w-66 max-w-66 flex-col bg-white shadow-md shadow-black/20 dark:bg-blue-900 dark:text-white">
      <section className="w-full">
        <img
          className="h-40 w-full object-cover"
          src={flag}
          alt={`flag of ${name}`}
        />
      </section>
      <section className="px-6 py-5.5">
        <h3 className="text-preset-3 mb-4">{name}</h3>
        <dl>
          <div className="flex gap-0.5">
            <dt className="text-preset-8-semibold">Population:</dt>
            <dd className="text-preset-8-light">
              {population.toLocaleString()}
            </dd>
          </div>

          <div className="flex gap-0.5">
            <dt className="text-preset-8-semibold">Region:</dt>
            <dd className="text-preset-8-light">{region}</dd>
          </div>
          {capital && (
            <div className="mb-6.5 flex gap-0.5">
              <dt className="text-preset-8-semibold">Capital:</dt>
              <dd className="text-preset-8-light">{capital}</dd>
            </div>
          )}
        </dl>
      </section>
    </article>
  );
};

export default CountryCard;
