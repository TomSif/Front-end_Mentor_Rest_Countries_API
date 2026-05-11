import { Link } from "react-router";
import useTheme from "../hooks/useTheme";

function Header() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <header className="text-grey-950 flex w-full flex-row justify-between bg-white px-4 py-7.5 drop-shadow-sm md:px-10 xl:px-21 dark:bg-blue-900 dark:text-white">
      <Link to={`/`}>
        <h1 className="text-preset-7 xl:text-preset-2">Where in the world?</h1>
      </Link>
      <button
        onClick={toggleTheme}
        type="button"
        className="text-preset-6-semibold xl:text-preset-4-semibold cursor-pointer"
      >
        {isDark ? (
          <span className="flex flex-row items-center gap-2">
            <img
              className="aspect-square h-3 w-3 object-cover xl:h-4 xl:w-4"
              src="/images/LightModeSun.png"
              alt="sun symbol "
            />
            <span>Light Mode</span>
          </span>
        ) : (
          <span className="flex flex-row items-center gap-2">
            <img
              className="aspect-square h-3 w-3 object-cover xl:h-4 xl:w-4"
              src="/images/DarkModeIcon.png"
              alt="moon symbol "
            />
            <span>Dark Mode</span>
          </span>
        )}
      </button>
    </header>
  );
}

export default Header;
