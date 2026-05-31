import BashadiAgencyLogo from "../assets/bashadi-agency-logo.png";
import Ecommerce from "../assets/ecommerce.png";
import Recruitment from "../assets/recruitment.png";
import VillebizLogo from "../assets/villebiz-logo.png";
import { Youtube, Instagram, Linkedin, Twitter, Mail } from "lucide-react";
import Work from "@/components/Work";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import ContactBand from "@/components/ContactBand";
import Services from "@/components/Services";
import Hero from "@/components/Hero";

const WHATSAPP_URL = "https://wa.me/254734720752";
const EMAIL_URL = "mailto:imranmat254@gmail.com";
const PHONE_URL = "tel:+254703733399";

const socialMediaLinks = [
  { icon: Youtube, label: "Youtube", url: "https://youtube.com/mat_imrany" },
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
  { icon: Mail, label: "Email", url: EMAIL_URL },
];

const projects = [
  {
    title: "Bashadi Agency",
    kind: "Manpower Recruitment Platform",
    blurb:
      "End-to-end recruitment portal connecting employers with vetted talent — listings, applications, and admin dashboard.",
    tags: ["React", "Node.js", "PostgreSQL"],
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
  },
  {
    title: "REST API Services",
    kind: "Backend",
    blurb:
      "Authenticated, documented APIs powering web and mobile clients with rate-limiting and monitoring.",
    tags: ["Node.js", "JWT", "OpenAPI"],
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
  { title: "Email Systems", desc: "Transactional pipelines and templates." },
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
    label: "Online Payment Integrations",
  },
  {
    className: "row-span-1",
    gradient: "from-sky-500/25 via-cyan-500/5",
    label: "Email API",
  },
  {
    className: "row-span-1",
    gradient: "from-rose-500/25 via-pink-500/5",
    label: "Backend microservices",
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
      <ContactBand
        EMAIL_URL={EMAIL_URL}
        PHONE_URL={PHONE_URL}
        WHATSAPP_URL={WHATSAPP_URL}
      />
      <Footer socialMediaLinks={socialMediaLinks} />
    </div>
  );
}
