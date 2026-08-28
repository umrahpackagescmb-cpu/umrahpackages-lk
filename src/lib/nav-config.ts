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
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};
