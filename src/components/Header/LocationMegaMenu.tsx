import Link from "next/link";
import { getLocationColumns } from "./locationData";

interface LocationMegaMenuProps {
  selectedLanguage: any;
  handleNavLinkClick?: () => void;
}

export const LocationMegaMenu = ({
  selectedLanguage,
  handleNavLinkClick,
}: LocationMegaMenuProps) => {
  const columns = getLocationColumns();

  return (
    <div className="row listing-row">
      <div className="col-lg-12">
        <div className="megamenu-title">
          <span>{selectedLanguage?.location}</span>
        </div>
      </div>
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} className="col-md-4">
          <ul className="uder-line-icon-ul">
            {column.map((location) => (
              <li key={location.key}>
                <Link
                  prefetch={false}
                  href={location.href}
                  className="uder-line-icon-ul-link"
                  onClick={handleNavLinkClick}
                >
                  {selectedLanguage?.[location.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

