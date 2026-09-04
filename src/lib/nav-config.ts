export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
};

export const mainNav: NavItem[] = [
  { label: "Packages", href: "/packages" },
  { label: "Compare", href: "/compare" },
  { label: "Agencies", href: "/agencies" },
  {
    label: "Resources",
    href: "/islamic-tools",
    children: [
      { label: "Islamic Tools", href: "/islamic-tools", description: "Prayer times, Qibla, Zakat & more" },
      { label: "Islamic Names", href: "/islamic-names", description: "1,000+ names with meanings" },
      { label: "Maulavi Directory", href: "/maulavi-directory", description: "Find scholars & guides" },
      { label: "Islamic Blog", href: "/blog", description: "Guides, tips & Umrah insights" },
    ],
  },
  {
    label: "Shop",
    href: "/merchandise",
    children: [
      { label: "Merchandise", href: "/merchandise", description: "Branded travel gear — coming soon" },
      { label: "Wholesale", href: "/merchandise/wholesale", description: "Bulk kits for travel companies" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  Platform: [
    { label: "Packages", href: "/packages" },
    { label: "Compare Packages", href: "/compare" },
    { label: "Travel Agencies", href: "/agencies" },
    { label: "Search", href: "/search" },
  ],
  "Browse by Type": [
    { label: "Cheap Umrah Packages", href: "/cheap-umrah-packages" },
    { label: "Luxury Umrah Packages", href: "/luxury-umrah-packages" },
    { label: "Family Umrah Packages", href: "/family-umrah-packages" },
    { label: "Ramadan Umrah Packages", href: "/ramadan-umrah-packages" },
    { label: "December Umrah Packages", href: "/december-umrah-packages" },
    { label: "Umrah Cost in Sri Lanka", href: "/umrah-cost-sri-lanka" },
    { label: "Best Umrah Agencies", href: "/best-umrah-agencies-sri-lanka" },
    { label: "Licensed Umrah Operators", href: "/licensed-umrah-operators-sri-lanka" },
  ],
  Resources: [
    { label: "Islamic Tools", href: "/islamic-tools" },
    { label: "Islamic Names", href: "/islamic-names" },
    { label: "Maulavi Directory", href: "/maulavi-directory" },
    { label: "Islamic Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "For Travel Agencies", href: "/for-agencies" },
    { label: "Merchandise", href: "/merchandise" },
    { label: "Wholesale for Travel Companies", href: "/merchandise/wholesale" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};
