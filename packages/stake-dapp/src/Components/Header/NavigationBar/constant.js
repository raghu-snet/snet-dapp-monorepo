export const navbarItems = [
  { label: "Home", type: "link", openInNewTab: false, activeLinks: ["/landing"], to: "/landing" },
  { label: "How It Works", type: "link", openInNewTab: false, activeLinks: ["/", "/howitworks"], to: "/howitworks" },
  { label: "Schedule", type: "link", openInNewTab: false, activeLinks: ["/", "/schedule"], to: "/schedule" },
];

export const dropdowns = [
  {
    label: "Products",
    list: [
      { label: "AI Marketplace", link: "https://beta.singularitynet.io/", newTab: true },
      { label: "Dev Portal", link: "https://dev.singularitynet.io/", newTab: true },
      { label: "AI Publisher", link: "https://publisher.singularitynet.io/", newTab: true },
    ],
  },
];
