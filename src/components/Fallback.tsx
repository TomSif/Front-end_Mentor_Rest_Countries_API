import { Link } from "react-router";
function Fallback() {
  return (
    <article className="text-grey-950 flex min-h-dvh flex-col items-center-safe gap-6 bg-white dark:bg-blue-950 dark:text-white">
      <h2 className="text-preset-11-bold mt-[15%]">
        Oops! This page could not be found.
      </h2>
      <p>
        There are many countries in the world , but not that one ! Please go
        back to where you came from...
      </p>
      <Link to={`/`}>
        <h3 className="text-preset-4-semibold items-center justify-center bg-white px-4 py-1.5 text-center drop-shadow-sm dark:bg-blue-900">
          Go back to Home
        </h3>
      </Link>
    </article>
  );
}

export default Fallback;
