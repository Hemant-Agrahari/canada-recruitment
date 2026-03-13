export const locationLinks = [
  {
    key: "Montreal",
    href: "/recruitment-agencies-montreal",
  },
  {
    key: "Edmonton",
    href: "/recruitment-agencies-edmonton",
  },
  {
    key: "Vancouver",
    href: "/recruitment-agencies-vancouver",
  },
  {
    key: "Kitchener",
    href: "/recruitment-agencies-kitchener",
  },
  {
    key: "Calgary",
    href: "/recruitment-agencies-calgary",
  },
  {
    key: "Barrie",
    href: "/staffing-agencies-barrie-ontario",
  },
  {
    key: "Winnipeg",
    href: "/staffing-agency-winnipeg",
  },
  {
    key: "Cambridge",
    href: "/recruitment-companies-cambridge",
  },
  {
    key: "NorthYork",
    href: "/staffing-agency-north-york",
  },
  {
    key: "Surrey",
    href: "/staffing-agency-surrey",
  },
  {
    key: "Burlington",
    href: "/staffing-agencies-burlington",
  },
  {
    key: "Mississauga",
    href: "/recruitment-agencies-mississauga",
  },
  {
    key: "Toronto",
    href: "/recruitment-agencies-toronto",
  },
  {
    key: "Vaughan",
    href: "/staffing-agency-vaughan",
  },
  {
    key: "London",
    href: "/staffing-agency-london-ontario",
  },
  {
    key: "Etobicoke",
    href: "/staffing-agency-etobicoke",
  },
  {
    key: "Halifax",
    href: "/staffing-agency-halifax",
  },
  {
    key: "Guelph",
    href: "/staffing-agency-guelph",
  },
  {
    key: "Regina",
    href: "/recruitment-agency-regina",
  },
  {
    key: "StCatharines",
    href: "/staffing-agency-st-catharines",
  },
  {
    key: "Windsor",
    href: "/staffing-agency-windsor",
  },
  {
    key: "Brampton",
    href: "/staffing-agency-brampton",
  },
  {
    key: "Scarborough",
    href: "/staffing-agency-scarborough",
  },
  {
    key: "Brantford",
    href: "/staffing-agency-brantford",
  },
  {
    key: "Oshawa",
    href: "/staffing-agency-oshawa",
  },
  {
    key: "Moncton",
    href: "/staffing-agency-moncton",
  },
];

// Split into 3 columns for desktop view
export const getLocationColumns = () => {
  const itemsPerColumn = Math.ceil(locationLinks.length / 3);
  return [
    locationLinks.slice(0, itemsPerColumn),
    locationLinks.slice(itemsPerColumn, itemsPerColumn * 2),
    locationLinks.slice(itemsPerColumn * 2),
  ];
};

