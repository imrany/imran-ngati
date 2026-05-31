import BashadiAgencyLogo from "../assets/bashadi-agency-logo.png";
import Ecommerce from "../assets/ecommerce.png";
import Recruitment from "../assets/recruitment.png";
import VillebizLogo from "../assets/villebiz-logo.png";
import {
  Youtube,
  Instagram,
  Linkedin,
  Twitter,
  MessageSquare,
  Layout,
  Code,
  Server,
} from "lucide-react";
import Work from "@/components/Work";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import ContactBand from "@/components/ContactBand";
import Services from "@/components/Services";
import InBoardingProcess from "@/components/InBoardingProcess";
import Hero from "@/components/Hero";
import Tools from "@/components/Tools";
import GmailIcon from "@/components/GmailIcon";

const WHATSAPP_URL = "https://wa.me/254734720752";
const EMAIL_URL = "mailto:imranmat254@gmail.com";
const PHONE_URL = "tel:+254703733399";
const OG_GITHUB =
  "https://opengraph.githubassets.com/fdcb2a1506b0b16a9a2ab7bca118c12967762e1bb919e36fa9ac1e6a22ef2e90/imrany";
const GITHUB_PROFILE = "https://gihub.com/imrany";

const socialMediaLinks = [
  {
    icon: Youtube,
    label: "Youtube",
    url: "https://www.youtube.com/@mat_imrany",
  },
  {
    icon: Instagram,
    label: "Instagram",
    url: "https://instagram.com/its_imrany",
  },
  { icon: Twitter, label: "Twitter", url: "https://twitter.com/matano_imran" },
  {
    icon: Linkedin,
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/imranmatano",
  },
  { icon: GmailIcon, label: "Email", url: EMAIL_URL },
];

const projects = [
  {
    title: "Bashadi Agency",
    kind: "Manpower Recruitment Platform",
    blurb:
      "End-to-end recruitment portal connecting employers with vetted talent — listings, applications, and admin dashboard.",
    tags: ["Vue", "Rust", "PostgreSQL", "SQLite"],
    gradient: "from-indigo-500/30 via-violet-500/10 to-transparent",
    logo: BashadiAgencyLogo,
    url: "https://bashadi-agency.onrender.com",
  },
  {
    title: "E-commerce",
    kind: "Online Store",
    blurb:
      "Full storefront with cart, checkout, inventory and order management, optimized for mobile-first shoppers.",
    tags: ["React", "M-Pesa", "REST API"],
    gradient: "from-emerald-500/30 via-teal-500/10 to-transparent",
    logo: VillebizLogo,
    url: "https://elegance-u3gc.onrender.com",
  },
  {
    title: "M-Pesa Integration",
    kind: "Payments",
    blurb:
      "STK Push, C2B and B2C flows with reconciliation webhooks and idempotent transaction handling.",
    tags: ["Daraja API", "Webhooks", "Node.js"],
    gradient: "from-amber-500/30 via-orange-500/10 to-transparent",
  },
  {
    title: "Email Integration",
    kind: "Transactional Email",
    blurb:
      "Templated, deliverable email pipelines — verification, receipts and campaigns with bounce handling.",
    tags: ["SMTP", "Templates", "Queues"],
    gradient: "from-sky-500/30 via-cyan-500/10 to-transparent",
    url: GITHUB_PROFILE + "/whats-email",
  },
  {
    title: "Backend Microservices",
    kind: "Backend",
    blurb:
      "Authenticated, documented APIs powering web and mobile clients with rate-limiting and monitoring.",
    tags: ["Go", "JWT", "Postgres"],
    gradient: "from-rose-500/30 via-pink-500/10 to-transparent",
  },
];

const services = [
  {
    title: "Web Applications",
    desc: "Production-grade React & TypeScript apps.",
  },
  { title: "E-commerce", desc: "Storefronts, carts, checkout, and admin." },
  { title: "M-Pesa Integrations", desc: "STK Push, C2B, B2C, reconciliation." },
  {
    title: "Email Integration",
    desc: "Transactional pipelines and templates.",
  },
  { title: "API Development", desc: "REST APIs, auth, and documentation." },
  { title: "Maintenance", desc: "Bug fixes, performance and uptime." },
];

const bentoTiles = [
  {
    className: "row-span-1",
    gradient: "from-indigo-500/25 via-violet-500/5",
    label: "E-commerce",
    image: Ecommerce,
    url: "https://elegance-u3gc.onrender.com",
  },
  {
    className: "row-span-2",
    gradient: "from-emerald-500/25 via-teal-500/5",
    label: "Bashadi Agency",
    image: Recruitment,
    url: "https://bashadi-agency.onrender.com",
  },
  {
    className: "row-span-1",
    gradient: "from-amber-500/25 via-orange-500/5",
    label: "M-Pesa Integration",
    image: "https://paystarafrica.com/wp-content/uploads/2025/03/mpesa_api.png",
    url: "mailto:imranmat254@gmail.com?subject=Online Payment Integrations Request",
  },
  {
    className: "row-span-1",
    gradient: "from-sky-500/25 via-cyan-500/5",
    label: "Email Integration",
    image:
      "https://res.cloudinary.com/smartsupp/image/upload/w_800,f_auto,q_auto/v1769436869/upload/hero__email_vyzotr.png",
    url: GITHUB_PROFILE + "/whats-email",
  },
  {
    className: "row-span-1",
    gradient: "from-rose-500/25 via-pink-500/5",
    label: "Backend microservices",
    image:
      "https://miro.medium.com/v2/resize:fit:720/format:webp/1*s0RrQ5y0-kPq6_W93wvwYw.png",
    url: "mailto:imranmat254@gmail.com?subject=Backend Microservices Request",
  },
];

const techStack = [
  // --- LANGUAGES ---
  {
    name: "TypeScript / JS",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1280px-Typescript_logo_2020.svg.png",
    bgClass: "hover:border-blue-500/40 hover:bg-blue-500/5",
    description: "Application logic & web interfaces",
    category: "languages",
  },
  {
    name: "Go Language",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Go_Logo_Blue.svg/1280px-Go_Logo_Blue.svg.png",
    bgClass: "hover:border-cyan-400/40 hover:bg-cyan-400/5",
    description: "High-performance microservices",
    category: "languages",
  },
  {
    name: "Rust",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Rust_programming_language_black_logo.svg/960px-Rust_programming_language_black_logo.svg.png",
    bgClass:
      "hover:border-orange-500/40 hover:bg-orange-500/5 dark:invert-[0.1] dark:hover:invert-0",
    description: "Systems & memory-safe backends",
    category: "languages",
  },
  {
    name: "Python",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/500px-Python-logo-notext.svg.png",
    bgClass: "hover:border-yellow-500/40 hover:bg-yellow-500/5",
    description: "Data automation & CLI tools",
    category: "languages",
  },

  // --- DATABASES ---
  {
    name: "PostgreSQL",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Logo_PostgreSQL.png?_=20230908055039",
    bgClass: "hover:border-blue-400/40 hover:bg-blue-400/5",
    description: "Relational storage & complex queries",
    category: "databases",
  },
  {
    name: "MongoDB",
    logo: "https://miro.medium.com/v2/resize:fit:640/format:webp/0*8v1xNP18Ovj3wg6K.gif",
    bgClass: "hover:border-green-500/40 hover:bg-green-500/5",
    description: "Document storage & fast prototyping",
    category: "databases",
  },
  {
    name: "SQLite",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/SQLite370.svg/1280px-SQLite370.svg.png",
    bgClass: "hover:border-sky-500/40 hover:bg-sky-500/5",
    description: "Lightweight embedded storage",
    category: "databases",
  },

  // --- INFRASTRUCTURE & TOOLS ---
  {
    name: "Docker",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/79/Docker_%28container_engine%29_logo.png?_=20150121160542",
    bgClass: "hover:border-blue-400/40 hover:bg-blue-400/5",
    description: "Containerization & environment parity",
    category: "infra",
  },
  {
    name: "Git",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Git-logo.svg/1280px-Git-logo.svg.png",
    bgClass: "hover:border-orange-600/40 hover:bg-orange-600/5",
    description: "Distributed version control",
    category: "infra",
  },
  {
    name: "Nginx",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Nginx_logo.svg/1280px-Nginx_logo.svg.png",
    bgClass: "hover:border-green-600/40 hover:bg-green-600/5",
    description: "Reverse proxy & load balancing",
    category: "infra",
  },
  {
    name: "Google Cloud",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Google_cloud.png?_=20221114153009",
    bgClass: "hover:border-blue-500/40 hover:bg-blue-500/5",
    description: "Cloud computing & managed clusters",
    category: "infra",
  },
  {
    name: "VPS Hosting",
    logo: "https://assets.tripplite.com/large-image/sr25ub-front-l.jpg",
    bgClass:
      "hover:border-purple-500/40 hover:bg-purple-500/5 dark:invert-[0.2] dark:hover:invert-0",
    description: "Bare-metal virtual setups & Linux deployments",
    category: "infra",
  },
];

const steps = [
  {
    phase: "01",
    title: "Discovery & Blueprint",
    description:
      "Alignment call to outline project scope, technical specifications, database architecture, and initial wireframes.",
    deliverables: [
      "System Requirements Doc",
      "Figma Wireframes",
      "Fixed Quote",
    ],
    duration: "3 - 5 Days",
    cost: "Free Engagement",
    icon: <MessageSquare className="size-5 text-blue-500" />,
  },
  {
    phase: "02",
    title: "UI/UX High-Fidelity Design",
    description:
      "Crafting modern, responsive user interfaces customized for your target audience. Built with interactive interactive prototypes.",
    deliverables: ["Interactive Figma Prototype", "Design Component System"],
    duration: "1 Week",
    cost: "KES 3,000",
    icon: <Layout className="size-5 text-purple-500" />,
  },
  {
    phase: "03",
    title: "Full-Stack Development",
    description:
      "Transforming signed-off layouts into clean source code using high-speed engines (Go/Python/TypeScript) and efficient local data layer architectures.",
    deliverables: [
      "Clean Git Repository",
      "Frontend Components",
      "API Testing",
    ],
    duration: "2 - 3 Weeks",
    cost: "KES 25,000",
    icon: <Code className="size-5 text-orange-500" />,
  },
  {
    phase: "04",
    title: "Optimized Cloud Launch",
    description:
      "Setting up lightweight Docker containers, staging reverse-proxies through Nginx, and going live on an affordable cloud VPS infrastructure.",
    deliverables: [
      "Live Production Domain",
      "SSL Security Certificate",
      "Automated Backups",
    ],
    duration: "2 - 3 Days",
    cost: "KES 10,000",
    icon: <Server className="size-5 text-green-500" />,
  },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-display selection:bg-accent/20 selection:text-foreground">
      <Nav
        EMAIL_URL={EMAIL_URL}
        PHONE_URL={PHONE_URL}
        WHATSAPP_URL={WHATSAPP_URL}
      />
      <Hero
        EMAIL_URL={EMAIL_URL}
        PHONE_URL={PHONE_URL}
        WHATSAPP_URL={WHATSAPP_URL}
        bentoTiles={bentoTiles}
      />
      <Work projects={projects} />
      <Services services={services} />
      <InBoardingProcess steps={steps} />
      <Tools techStack={techStack} />
      <ContactBand
        EMAIL_URL={EMAIL_URL}
        PHONE_URL={PHONE_URL}
        WHATSAPP_URL={WHATSAPP_URL}
      />
      <Footer socialMediaLinks={socialMediaLinks} />
    </div>
  );
}
