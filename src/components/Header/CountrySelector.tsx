import Link from "next/link";
import { countryOptions } from "./headerData";

interface CountrySelectorProps {
  activeCountry: string;
  setActiveCountry: (code: string) => void;
}

export const CountrySelector = ({
  activeCountry,
  setActiveCountry,
}: CountrySelectorProps) => {
  return (
    <div className="country-selector">
      <span className="country-divider">/</span>
      <div className="country-dropdown">
        <button className="country-toggle" type="button">
          <span className="country-code">{activeCountry}</span>
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L5 5L9 1"
              stroke="#494b4c"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="country-dropdown-menu">
          {countryOptions.map((country) => (
            <Link
              key={country.code}
              href={country.href}
              className={`country-option ${
                activeCountry === country.code ? "active" : ""
              }`}
              onClick={() => setActiveCountry(country.code)}
            >
              <span className="option-name">{country.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

