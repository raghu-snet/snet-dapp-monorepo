const PrimaryFooterLeft = [
  { label: "Contact Us", link: "https://singularitynet.io/#contact" },
  { label: "Foundation Site", link: "https://singularitynet.io/" },
  { label: "White Paper", link: "https://public.singularitynet.io/whitepaper.pdf" },
];

const PrimaryFooterMain = [
  {
    title: "AI Publisher",
    children: [
      { label: "Free Signup", link: "/signup", internalLink: true },
      { label: "How it Works", link: "/enroll" },
    ],
  },
  {
    title: "Dev Docs",
    children: [
      { label: "Getting Started", link: "https://dev.singularitynet.io/docs/ai-developers/" },
      { label: "Creating Organization", link: "https://dev.singularitynet.io/docs/ai-developers/organization/" },
      { label: "Creating Service", link: "https://dev.singularitynet.io/docs/ai-developers/service/" },
      { label: "Tutorials", link: "https://dev.singularitynet.io/docs/ai-developers/setupguide/" },
    ],
  },
  {
    title: "Products",
    children: [
      { label: "AI Marketplace", link: "https://beta.singularitynet.io" },
      { label: "AI Publisher", link: "#" },
      { label: "Stake", link: "https://staking.singularitynet.io" },
    ],
  },
  {
    title: "Community",
    children: [
      { label: "Blog", link: "http://blog.singularitynet.io/" },
      { label: "Forum", link: "https://community.singularitynet.io/" },
      { label: "Telegram", link: "https://telegram.me/singularitynet" },
    ],
  },
];

const SecondaryFooter = [
  { title: "Github", className: "fab fa-github", link: "https://github.com/singnet" },
  { title: "Twitter", className: "fab fa-twitter", link: "https://twitter.com/singularity_net" },
  { title: "Facebook", className: "fab fa-facebook-f", link: "https://www.facebook.com/singularityNET.io" },
  { title: "Linkedin", className: "fab fa-linkedin-in", link: "https://www.linkedin.com/company/singularitynet/" },
  { title: "Youtube", className: "fab fa-youtube", link: "https://www.youtube.com/channel/UCbTE8vfz5zuEK5uRnc2yjrw" },
  { title: "Instagram", className: "fab fa-instagram", link: "https://instagram.com/singularitynet.io" },
];

export const FooterData = {
  PrimaryFooterLeft,
  PrimaryFooterMain,
  SecondaryFooter,
};
